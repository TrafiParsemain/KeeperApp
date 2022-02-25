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
import { ErrorRounded, InfoTwoTone } from '@mui/icons-material';
import { waitFor } from '@testing-library/react';

//JS map pour boucler sur l'array notesInfos

function Notes(){

    //State la liste des notes
    const [listNotes,setListNotes] = useState([]);//useState(notesInfo); //Lecture static fichier

    const[message,setMessage] = useState('No message');

    const[appMessage,setAppMessage] = useState('');

    const [triggerValue,setTriggerValue] = useState(0);

    const {name} = useParams(); // La variable doit être du même que le paramètre et entre {} 

    const [compteurStatut,setCompteurStatut] =  useState({
        ctOK: 0,
        ctAlert:0,
        ctWarning: 0
    })

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
        .then(response =>  {
            refreshNotes()
        })

    }
    //Met a jour la note
    function updateNote(note){
        console.log("Asking to update note for new statut : " + note.statut);

        let username = AuthentificationService.getLoggedUsername()
        note.username = username
        NotesDataService.updateNote(username,note.id,note)
        .then(response =>  {
            refreshNotes()
        })
    }

    //Met a jour le message
    function updateMessage(newMessage){
        setMessage(newMessage);
    }


    //API pour recevoir le message
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

        refreshNotes()

    }

    //Lancé apres le render du composant (Pour les composants type fonction)
    React.useEffect(() =>  {
        refreshNotes();
    },[]);

    //Met à jout toutes les notes
    async function refreshNotes(){
        console.log("Refresh Notes");
        let username = AuthentificationService.getLoggedUsername()
        NotesDataService.RetrieveAllNotes(username)
        .then(response => {
            const newListe = response.data
            setListNotes(newListe)
            refreshCompteur(newListe)           
        })
    }


    //Mise à jour du compteur de statut
    function refreshCompteur(newListe){
        console.log("Refresh Compteur");
        let compteur = {
            ctOK: 0,
            ctAlert: 0,
            ctWarning: 0
        }
        newListe.map( (noteInfo,index) =>{
            console.log(noteInfo)
            if(noteInfo.statut === "OK"){
                compteur.ctOK ++
                console.log("ok")
            }else if(noteInfo.statut === "warning"){
                compteur.ctWarning ++
                console.log("warning")
            }else if(noteInfo.statut === "alert"){
                compteur.ctAlert ++
                console.log("alert")
            }
        })
        setCompteurStatut(compteur)
        console.log("NB OK : " + compteurStatut.ctOK)
        console.log("NB alert : " + compteurStatut.ctAlert)
        console.log("NB Warning : " + compteurStatut.ctWarning)
    }


    ////////////////////RETOUR /////////////////////
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

    <CreateArea  
        onClickAdd = {addNote}
        compteur = {compteurStatut}
    />

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