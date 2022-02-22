import React from 'react';
import StatutSquare from './StatutSquare';
import DeleteIcon from '@mui/icons-material/Delete';


function Note(props){

    function changeStatut(statut){
        
        console.log("I call my note id is : " + props.id + " the staut is : " + statut);

        //Changer statut
        if(statut === "OK"){
            statut = "warning"
        } else if (statut ==="warning"){
            statut = "alert"
        } else if (statut === "alert") {
            statut = "OK"
        }
        //New note data
        const toUpdateNote = {
            id: props.id,
            title: props.title,
            content: props.content,
            statut: statut
        }
        props.updateNote(toUpdateNote);
    }


    return <div className ="note">
    <div>
    <table> 
        <tr>
            <td><h1>{props.title}</h1> </td>
            <td><StatutSquare 
            statut={props.statut}
            onClickStatut={changeStatut}
            /></td>
        </tr>
    </table> 
    </div>
    <p>{props.content}</p>
    <button onClick = { () => {
        props.onClickDelete(props.id);
    } }>
    <DeleteIcon/>
    </button>
    </div>;
}

export default Note ;