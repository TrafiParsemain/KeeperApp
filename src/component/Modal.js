import { ConstructionOutlined, NetworkWifiOutlined } from "@mui/icons-material";
import React ,{useState} from "react";

function Modal(props) {


    function handleChange(event){
        props.changeTextFunction(event)
      }



    function handleClick(e){
        //console.log(e.target.id)
        if(e.target.id == "myModal") {props.clicOutside()}
    }

    function handleSubmit(event){
        event.preventDefault(); //Important
        props.submitEditNote()
    }

    if(!props.show){
        return null;
    }
    return <div>
         
            <div id="myModal" class = "modal" onClick={e => {handleClick(e)}}>
                <div class = "modal-content wrapper" >
                <form onSubmit = {handleSubmit}>
                    <div class= "one">Modification de la note :</div>
                    <div class = "two closeX"> 
                        <button class="close"onClick= {e=> {props.onClose(e)}}>
                            X
                        </button>
                    </div>
                    <div class = "three">
                        <input  name="title" onChange={handleChange} placeholder="New Title" value = {props.children.title}/>
                        <textarea  name="content"  onChange={handleChange} placeholder="New Content" value = {props.children.content}/>
                        <button type="submit">Valider</button>
                    </div>
                </form>  
                </div>
                
            </div>
        
        </div>
    
}

export default Modal ;