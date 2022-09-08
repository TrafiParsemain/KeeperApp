import React, {useState} from "react";

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import PdfService from "../api/PdfService";
import fileReader from 'react-file-reader';

function Pdf(){

    async function myFunction(){
        console.log("Starting function");

        const response = await PdfService.getPdfTemplate()
        console.log(response.data)

        //Retreive Doc
        const blob = new Blob([response.data])
        const arrayBuffer = await blob.arrayBuffer()

        //convert arrayBuffer to Uint_array
        const result = new Uint8Array(arrayBuffer);
        console.log(result)

        //open doc with pdf-lib
        const pdfDoc = await  PDFDocument.load(result)
        console.log(pdfDoc)
        console.log(pdfDoc.getPageCount())
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        
        console.log("CEST LAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        let TEXTContent = await firstPage.translateContent()
        console.log(TEXTContent)
        
        console.log(firstPage.doc.getAuthor());

        firstPage.moveTo(72,330)
        firstPage.drawText("YO YO YO")

        /*const { width, height } = firstPage.getSize()
        firstPage.drawText('COUCOU EC!', {
            x: 5,
            y: height / 2 + 300,
            size: 50,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(-45),
          })*/

        //Save Doc as binary
        const pdfBytes = await pdfDoc.save()
        console.log(pdfBytes)
        

        //Dl doc
        //download(pdfBytes, "PDFTemplatebis.pdf", "application/pdf");

        const newBlob = new Blob([pdfBytes],{type:'application/pdf'})
        const url = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'PDFTemplatebis.pdf'); //or any other extension
        document.body.appendChild(link);
        //link.click();




    }

    return <div>
    <div>PDF PLACE</div>
    <div><button onClick= {myFunction} >Clic me</button></div>
    </div>
}

export default Pdf ;