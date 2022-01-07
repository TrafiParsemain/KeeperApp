import React from 'react';
import StatuSquare from './StatutSquare';
import DeleteIcon from '@mui/icons-material/Delete';


function Note(props){

    return <div className ="note">
    <div>
    <table> 
        <tr>
            <td><h1>{props.title}</h1> </td>
            <td><StatuSquare statut={props.statut}/></td>
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