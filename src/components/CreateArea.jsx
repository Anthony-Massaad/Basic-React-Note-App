import React from "react";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear"
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import CheckIcon from "@material-ui/icons/Check"

function CreateArea(props) {
  return (
    <div className="container form-container">
      <form className="create-note">
        <input onClick={()=>props.expandNote(true)} onChange={props.onChange} name="title" placeholder="Title" value={props.title} />
        <textarea 
          className={props.expandNoteBool ? "text-expanded" : "text-closed"} 
          style={props.overflowBool ? {overflow: "revert"} : {overflow: "hidden"}}  
          onTransitionEnd={props.overflowTransitionEndFunc} onChange={props.onChange} 
          name="content" 
          placeholder="Take a note..." 
          rows="3" 
          value={props.content} 
        />
        <Zoom in={props.expandNoteBool}>
          <Fab onClick={props.clearNoteFunction}><ClearIcon /></Fab>
        </Zoom>
        <Zoom in={props.expandNoteBool}>
          {props.editNoteBoolean ? <Fab onClick={props.saveEditNoteFunction}><CheckIcon /></Fab> : <Fab onClick={props.addNote}><AddIcon /></Fab>}
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
