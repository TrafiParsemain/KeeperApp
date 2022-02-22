import React, {Component, useState} from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer les params de l'URL

//Import du même dossier
import Note from "./Note";
import CreateArea from './CreateArea';

//import d'un dossier supérieur
import notesInfo from "../NotesInfo";

import  HelloWorldService from "../api/HelloWorldService.js"
import NotesDataService from '../api/NotesDataService.js';
import AuthentificationService from './AuthentificationService';
import { ErrorRounded } from '@mui/icons-material';

//JS map pour boucler sur l'array notesInfos

function Notes(){

    //State la liste des notes
    const [listNotes,setListNotes] = useState([]);//useState(notesInfo); //Lecture static fichier

    const[message,setMessage] = useState('No message');

    const[appMessage,setAppMessage] = useState('');

    const {name} = useParams(); // La variable doit être du même que le paramètre et entre {} 

    //Suprimer la note
    function deleteNotes(id){
        console.log("please delete the note with id : " + id );
        
        /*setListNotes( prevNotes => {
            return prevNotes.filter((item,index) => {
                return index !==id;
            })
        })*/

        let username = AuthentificationService.getLoggedUsername()

        NotesDataService.deleteNote(username,id)
        .then(response =>  {  
                setAppMessage('Sucess of deleting not with id : ' + id)
                refreshNotes()
            })
    }

    //Ajouter une note
    function addNote(newNoteInfo){
        console.log("New note asked ");
        let username = AuthentificationService.getLoggedUsername()
        const newNote = {
            id : -1,
            username: username,
            title : newNoteInfo.title,
            content: newNoteInfo.content,
            statut: "OK"
        }

        //setListNotes( prevNotes => {
        //    return [...prevNotes, newNote]
        //})


        NotesDataService.createNote(username,newNote)
        .then(response =>  
            refreshNotes()     
        )

    }

    function updateNote(note){
        console.log("Asking to update note for new statut : " + note.statut);

        let username = AuthentificationService.getLoggedUsername()
        note.username = username
        NotesDataService.updateNote(username,note.id,note)
        .then(response =>  refreshNotes())
    }

    function updateMessage(newMessage){
        setMessage(newMessage);
    }

    function retrieveMessage(){
        //HelloWorldService.executeHelloWorldService()
        //.then( response => updateMessage(response.data))
        //.catch(error => updateMessage("Error from BackServer"))

        //HelloWorldService.executeHelloWorldObjectService()
        //.then( response => updateMessage(response.data.message))

        HelloWorldService.executeHelloWorldVariableService(name)
        .then( response => updateMessage(response.data.message))
        .catch(error =>  {
            let errorMessage = '';
            if(error.message) errorMessage += error.message
            if(error.response && error.response.data) {
                errorMessage+= error.response.data.message
            }
            updateMessage(errorMessage)
        })
    }

    //Lancé apres le render du composant (Pour les composants type fonction)
    React.useEffect(() =>  {
        refreshNotes();
    },[]);

    function refreshNotes(){
        console.log("Refresh all notes?");
        let username = AuthentificationService.getLoggedUsername()
        NotesDataService.RetrieveAllNotes(username)
        .then(response => setListNotes(response.data))
    }

    return (
        <div>
        <div class="alert alert-success">{appMessage}</div>
        {
            (name != null) &&  
            <div>
            <p>Welcome to {name}</p>
            <button onClick= {retrieveMessage} >Click Me</button>
            {message}
            </div>
        }

    <CreateArea  onClickAdd = {addNote}/>

    {
        //L'index est recu de la fonction map
        listNotes.map( (noteInfo,index) =>  <Note
        key = {index} //Key est obligatoire avec Map
        id = {noteInfo.id}
        title= {noteInfo.title}
        content= {noteInfo.content}
        statut= {noteInfo.statut}
        onClickDelete = {deleteNotes}
        updateNote = {updateNote}
    />
    )}


    {console.log("LIST SIZE " + listNotes.length)}
    </div>
    );
}

export default Notes ;