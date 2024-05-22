import './App.css';
import {useState} from "react";
import React from "react";

type Note = {
  id: number;
  title: string;
  content: string;
}

let x = "Thursday"

const App = () => {
  // Note[] states that we use type note, making sure elements are number, string twice
  // Allows us to easily see what components
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note title 1",
      content: "girlfriend is the best"
    },
    {
      id: 2,
      title: x,
      content: "girlfriend loves you"
    },
    {
      id: 3,
      title: "Saturday",
      content: "girlfriend is very proud of you"
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Creates a state that will be a currently selected note, default state is null
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Function for handling the Add Note button event
  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: " , title);
    console.log("content:", content);
    // Object of type Note
    const newNote: Note = {
      id: notes.length+1,
      title: title,
      content: content
    }
    if(content.trim() !== "" && title.trim() !==""){
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    }
  }
  // Function for handling when user clicks on a note, accepts a type note
  // Saves to state using the setSelectedNote 
  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  } 
  const handleUpdateNote = (event:React.FormEvent) =>{
    // preventDefault, stops form from submitting whenever user submits
    event.preventDefault();

    // If user doesn't have a selected note, returns to prior state
    if(!selectedNote){
      return;
    }

    const updatedNote: Note ={
      id: selectedNote.id,
      title: title,
      content: content,
    }

    // Map function, to create new array that updates new array with the new note object
    // Only updates note that the user has selected as the map will iterate over each note element
    const updatedNotesList = notes.map((note)=>
      note.id === selectedNote.id
        ? updatedNote
        : note
    )

    setNotes(updatedNotesList)
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }
  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }

  const deleteNote = (
    event : React.MouseEvent,
    noteId: number
  ) =>{
    // Onclick event is nested within the note so prevents
    event.stopPropagation();

    // Filter function iterates over the array, applies the function that we've defined
    // Returns all the notes that don't equal the ID of the note that was passed in
    const updatedNotes = notes.filter(
      (note) => note.id != noteId
    )

    setNotes(updatedNotes);

  }

  return(
    <div className="app-container">
      {/* Input for note */}
      <form 
        className = "note-form"
        
        onSubmit ={(event) =>
          selectedNote 
          ? handleUpdateNote(event)
          : handleAddNote(event)
        }
        >
        <input 
          placeholder = "Title" 
          value = {title}
          // Changes the title state value based on the user input
          onChange={(event)=>
            setTitle(event.target.value)
          }
          id="noteTitle"
          required>  
        </input>
        <textarea 
          placeholder="Content"
          value = {content}
          onChange={(event)=>
            setContent(event.target.value)
          }
          id="noteInput"
          rows = {10}
          required>  
        </textarea>
          {/*Displays edit options if a note has been selected*/}
          {selectedNote ? (
            <div className = "edit-buttons">
              <button type = "submit">Update</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button
            id="submit"
            onClick={handleAddNote}
            >
            Add Note
          </button>
          )}



      </form>
      <div className = "notes-grid">
        {notes.map((note)=>(
          <div 
            className = "note-item" key={note.id}
            // When note-item is clicked, passes in the note to our function
            onClick={() => handleNoteClick(note)}
          >
            <div className ="notes-header">
              <button
                onClick={(event) =>
                  deleteNote(event, note.id)

                }>
                <img src="images/close.png" alt="x"></img>
                </button>
            </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        )

        )}

      </div>
        
    </div>
  )
}

export default App;
