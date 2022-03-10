import React, {Component, useState} from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer les params de l'URL

//Import du même dossier
import Note from "./Note";
import CreateArea from './CreateArea';
import MyBarChart from "./MyBarChart";
import Modal from './Modal';

//import d'un dossier supérieur
import notesInfo from "../NotesInfo";

import  HelloWorldService from "../api/HelloWorldService.js"
import NotesDataService from '../api/NotesDataService.js';
import AuthentificationService from './AuthentificationService';
import { ConstructionOutlined, Download, ErrorRounded, InfoTwoTone } from '@mui/icons-material';

import { CSVLink, CSVDownload } from "react-csv" ;
import Papa from "papaparse";
import { Alert } from '@mui/material';

//JS map pour boucler sur l'array notesInfos

function Notes(){

    //State la liste des notes
    const [listNotes,setListNotes] = useState([]);//useState(notesInfo); //Lecture static fichier

    const[message,setMessage] = useState('No message');

    const[appMessage,setAppMessage] = useState('');

    const {name} = useParams(); // La variable doit être du même que le paramètre et entre {} 

    const [compteurStatut,setCompteurStatut] =  useState({
        ctOK: 0,
        ctAlert:0,
        ctWarning: 0
    })

    const [selectedStatut,setSelectedStatut] = useState("All");

    const [modalVisible, setModalVisible] = useState(false)

    const [noteModal,setNoteModal] = useState()

    function handleModalChange(event){
        const {name,value} = event.target
        setNoteModal((prevValue) => {
          return {
          ...prevValue,
          [name]: value
        }
        });
      }

    //Supprimer la note
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
                refreshNotes(selectedStatut)
            })
            .catch(error => {
                setAppMessage(error.message)
                refreshNotes(selectedStatut)
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
            refreshNotes(selectedStatut)
        })

    }


    //EDIT NOTE
    function editNote(note){
        setNoteModal(note)
        showModal()
    }

    //Met a jour la note
    function updateNote(note){
        console.log("Asking to update note for new statut : " + note.statut);

        let username = AuthentificationService.getLoggedUsername()
        note.username = username
        NotesDataService.updateNote(username,note.id,note)
        .then(response =>  {
            refreshNotes(selectedStatut)
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

        refreshNotes(selectedStatut)

    }

    //Lancé apres le render du composant (Pour les composants type fonction)
    React.useEffect(() =>  {
        refreshNotes(selectedStatut);
    },[]);


    //Met à jout toutes les notes
    async function refreshNotes(statut){
        console.log("Refresh Notes");
        let username = AuthentificationService.getLoggedUsername()
        NotesDataService.RetrieveAllNotes(username,statut)
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
            if(noteInfo.statut === "OK"){
                compteur.ctOK ++
            }else if(noteInfo.statut === "warning"){
                compteur.ctWarning ++
            }else if(noteInfo.statut === "alert"){
                compteur.ctAlert ++
            }
        })
        setCompteurStatut(compteur)
    }


    
    //API pour Dowload
    function DownloadNotes(){

        console.log("Click on DL button detected")

        let username = AuthentificationService.getLoggedUsername()
        updateMessage("Téléchargement désactivé")
        /*NotesDataService.DownloadNotes(username)
        //.then( response => console.log(response.data))
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'NotesData.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.log(error.message)
        })*/
        
    }

        function handleSelectChange(e){
            setSelectedStatut(e.target.value)
            refreshNotes(e.target.value)  
        }

        function showModal(){setModalVisible(!modalVisible)}

        function hideModal(){setModalVisible(false)}

        function submitEditNote() {
            
            setModalVisible(false)
            console.log(noteModal)
            updateNote(noteModal)
            
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
    <div><button onClick= {DownloadNotes} >DL Notes in CSV</button></div>
    
    <div class="wrapper">
        <div class= "one">           
            <CreateArea  
                onClickAdd = {addNote}
                compteur = {compteurStatut}
            />
        </div>
        <div class = "two cube">
            <select name ="statut" id ="statut-select" onChange={(e) => handleSelectChange(e)}>
                <option value="All">Tous</option>
                <option value="OK">OK</option>
                <option value="alert">Alert</option>
                <option value="warning">Warning</option>
            </select>     


        <MyBarChart
            compteur = {compteurStatut}
         />
         </div>
    </div>
    

    <Modal 
    onClose={showModal}
    show = {modalVisible}
    clicOutside= {hideModal}
    children = {noteModal}
    changeTextFunction= {handleModalChange}
    submitEditNote = {submitEditNote}
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
        editNote = {editNote}
    />
    )}
    </div>
    );
}

export default Notes ;