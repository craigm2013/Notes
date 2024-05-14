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

  const [ title, setTitle] = useState("");
  const [content, setContent] = useState("");


  /*function handleSubmit (event:React.FormEvent){
    const inputElement = document.getElementById("noteInput") as HTMLInputElement;
    const inputHeader = document.getElementById("noteTitle") as HTMLInputElement;
    const title = inputHeader.value;
    const content = inputElement.value;
    let Note = {3: 4, header, content};
    notes.push(Note);
  }*/
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: " , title);
    console.log("content:", content);
    // Object of type Note
    const newNote: Note = {
      id: notes.length+1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");

  }
  return(
    <div className="app-container">
      {/* Input for note */}
      <form 
        className = "note-form"
        onSubmit ={(event) => handleSubmit(event)}
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
        <button
          id="submit"
          onClick={handleSubmit}
          >
          Add Note
        </button>


      </form>
      <div className = "notes-grid">
        {notes.map((note)=>(
          <div className = "note-item" key={note.id}>
            <div className ="notes-header">
              <button><img src="images/x.png" alt="x"></img></button>
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
