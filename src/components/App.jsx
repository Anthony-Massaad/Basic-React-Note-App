import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [lstOfNotes, setLstOfNotes] = React.useState([]);
  const [newNote, setNewNote] = React.useState({
    title: "",
    content: ""
  });
  const [expanded, setExpanded] = React.useState(false);
  const [editNote, setEditNote] = React.useState(false);
  const [prevEdit, setPrevEdit] = React.useState(-1);
  const [overflow, setOverflow] = React.useState(false);


  /**
   * expand or close the note taking
   * @param {boolean} boolean, true to expand the note taking, otherwise false 
   */
  function expand(boolean){
    setExpanded(boolean);
  }

  /**
   * Handle the transition end state for the text area
   */
  function handleTransitionEnd(){
    setOverflow(!overflow);
  }

  /**
   * Reset the variables back to the default values
   */
  function clearNote(){
    expand(false);
    setEditNote(false);
    changeNoteContent();
    setPrevEdit(-1);
  }

  /**
   * Function that changes the note content to the new title and content given
   * @param {String} newTitle, the new title
   * @param {String} newContent, the new content
   */
  function changeNoteContent(newTitle="", newContent=""){
    setNewNote({
      title: newTitle,
      content: newContent
    });
  }

  /**
   * function for editting an existing note, and adding the contents to the note taking container. 
   * Also add a checkmark rather than a plus icon to save the current edits to the note
   * @param {Integer} id, the id associated with the note
   */
  function editExistingNote(id){
    setPrevEdit(id);
    expand(true);
    setEditNote(true);
    const noteToEdit = lstOfNotes.find((note,idx) => {return idx === id});
    changeNoteContent(noteToEdit.title, noteToEdit.content);
  }

  /**
   * Function for changing an existing note once edits were made and saved
   * @returns nothing
   */
  function changeNote(){
    if (newNote.title.trim() === "" || newNote.content.trim() === "") return;
    setLstOfNotes(prevNotes => prevNotes.map((note, idx) => {return idx === prevEdit ? newNote : note;}));
    clearNote();
  }

  /**
   * Function for deleting an existing note given the id
   * @param {Integer} id, the id associated with the note
   */
  function deleteNote(id){
    if (id === prevEdit) {
      clearNote(); 
    }
    setLstOfNotes(prevNotes => {
      return prevNotes.filter(
        (el, idx) => {return idx !== id;}
      );
    });
    setPrevEdit(prevEdit !== 0 ? prevEdit-1 : prevEdit);
  }

  /**
   * Function for adding the note to the list of notes and display it on the screen
   * makes use of the spread operator to add the note to the list of existing notes
   * @param {Event} e, the form note event
   * @returns nothing
   */
  function addNote(e){
    if (newNote.title.trim() === "" || newNote.content.trim() === "") return;
    setLstOfNotes(prevNotes =>{
      return [
        ...prevNotes,
        newNote
      ];
    });
    clearNote();
  }

  /**
   * handle function for updating the note contents in the usestate
   * makes sue of spread operator to effeciently update the newNote state
   * @param {Event} event, the form note event
   */
  function handleNewNoteChange(event){
    const {value, name} = event.target; 
    setNewNote(prevNewNote =>{
      return {
        ...prevNewNote,
        [name]: value
      };
    });
  }

  return (
    <div>
      <Header />
      <CreateArea 
        onChange={handleNewNoteChange} 
        content={newNote.content} 
        title={newNote.title} 
        addNote={addNote} 
        expandNote={expand} 
        expandNoteBool={expanded} 
        clearNoteFunction={clearNote} 
        editNoteBoolean={editNote} 
        saveEditNoteFunction={changeNote}
        overflowBool={overflow}
        overflowTransitionEndFunc={handleTransitionEnd}
      />
      <div className="note-container container">
        {lstOfNotes.map((note, idx) => <Note key={idx} id={idx} title={note.title} content={note.content} deleteFunction={deleteNote} editButtonFunction={editExistingNote} />)}
      </div>
      <Footer />
    </div>
  );
}

export default App;
