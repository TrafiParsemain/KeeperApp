import React, {useState} from 'react';

//Import du même dossier
import Heading from "./Heading";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from './CreateArea';

//import d'un dossier supérieur
import notesInfo from "../NotesInfo";

//JS map pour boucler sur l'array notesInfos

function App(){

    //State la liste des notes
    const [listNotes,setListNotes] = useState(notesInfo);

    //Suprimer la note
    function deleteNotes(id){
        console.log("please delete the note with id : " + id );
        setListNotes( prevNotes => {
            return prevNotes.filter((item,index) => {
                return index !==id;
            })
        })
    }

        //Ajouter une note
        function addNote(newNoteInfo){
            console.log("New note asked ");
            const newNote = {
                title : newNoteInfo.title,
                content: newNoteInfo.content, 
                statut: "OK" 
            }
            setListNotes( prevNotes => {
                return [...prevNotes, newNote]
            })
        }


    return (
        <div>
    <Heading/>
    <CreateArea 
        onClickAdd = {addNote}
    />
    
    {
        //L'index est recu de la fonction map
        listNotes.map( (noteInfo,index) =>  <Note
        key = {index} //Key est obligatoire avec Map
        id = {index}
        title= {noteInfo.title}
        content= {noteInfo.content}
        statut= {noteInfo.statut}
        onClickDelete = {deleteNotes}
    />
    )}
    {console.log("LIST SIZE " + listNotes.length)}
    <Footer/>
    </div>
    );
}

export default App ;