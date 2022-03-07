import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add'; //bliblio de icon
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import ChartJsComponent from "./ChartJsComponent";
import MyChartExample from "./MyChartExample";
import MyBarChart from "./MyBarChart";

function CreateArea(props) {

  const [noteInfo,setNoteInfo] = useState({
    title: "",
    content: ""
  });

  const [isExpanded,setExpanded] = useState(false);

  function handleChange(event){
    const {name,value} = event.target
    setNoteInfo((prevValue) => {
      return {
      ...prevValue,
      [name]: value
    }
    });
  }

  function handleClick(event){
    event.preventDefault(); //Important
    //Empeche le reloading classic du submit
    props.onClickAdd({
      title: noteInfo.title,
      content: noteInfo.content
    }) ;
    noteInfo.title = ""
    noteInfo.content = ""
    setExpanded(false)
  }

  function expand(){
    setExpanded(true);
  }
  
  return (
    <div style={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}>
      <form onSubmit = {handleClick} className="create-note">

        {isExpanded && (
          <input  name="title" 
          placeholder="Title"
          onChange={handleChange} 
          value = {noteInfo.title}
          />
        )}


        <textarea name="content" 
          placeholder="Take a note..."
          onClick= {expand} 
          rows={isExpanded ? 3 : 1} 
          onChange={handleChange}
          value = {noteInfo.content}
           />
        <Zoom in = {isExpanded}>
        <Fab type="submit">
        <AddIcon/>
        </Fab>
        </Zoom>
      </form>
        
    </div>
  );
}

export default CreateArea;