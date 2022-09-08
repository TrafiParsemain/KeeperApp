import React from 'react';
function StatutSquare(props){
    
    return    <div onClick={ () => {
        props.onClickStatut(props.statut);
    } } className = {props.statut}></div>;
}

export default StatutSquare ;