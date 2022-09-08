import axios from "axios"

class PdfService{

    getPdfTemplate(){
        return axios.get(`http://localhost:8080/get-pdf-template` ,{responseType: "blob"})
    }
    
    

}

export default new PdfService()