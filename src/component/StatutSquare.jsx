import React from 'react';
function StatuSquare(props){

    const [statut,setStatut] = React.useState(props.statut)

    function changeStatut(){
        if(statut === "OK"){
            setStatut ("warning")
        } else if (statut ==="warning"){
            setStatut ("alert")
        } else if (statut === "alert") {
            setStatut ("OK")
        }
    }

    return    <div onClick={changeStatut} className = {statut}></div>;
}

export default StatuSquare ;