import React from 'react';
function StatutSquare(props){

    //const [statut,setStatut] = React.useState(props.statut)

    /*function changeStatut(){
        if(statut === "OK"){
            setStatut ("warning")
        } else if (statut ==="warning"){
            setStatut ("alert")
        } else if (statut === "alert") {
            setStatut ("OK")
        }
    }*/

    return    <div onClick={ () => {
        props.onClickStatut(props.statut);
    } } className = {props.statut}></div>;
}

export default StatutSquare ;