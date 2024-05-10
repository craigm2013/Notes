import './App.css';
import {useState} from "react";

type Note = {
  id: number;
  title: string;
  content: string;
}
let newContent = "hello world"
let newHeader = "new note"
let x = 5;



const App = () => {
  
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note title 1",
      content: "Hello this is my first note"
    },
    {
      id: 2,
      title: "Thursday",
      content: "It was a very nice day"
    },
    {
      id: 3,
      title: "Saturday",
      content: "It wasn't such a nice day"
    },
    {
      id: 4,
      title: newHeader,
      content: newContent
    }
  ]);
  function addNote(){
    console.log("button clicked");
    const inputElement = document.getElementById("noteInput") as HTMLInputElement;
    const inputHeader = document.getElementById("noteHeader") as HTMLInputElement;
  
    const content = inputElement.value;
    const header = inputHeader.value;
  
    if(content.trim() !== "" && header.trim() !==""){
      
      notes[3].content=content;
      notes[3].title=header;
    }
  }
  /*document.addEventListener("DOMCOontentLoaded", function(){
    const mybutton = document.getElementById("submit");

    mybutton?.addEventListener("click", addNote)
  });*/
  return(
    <div className="app-container">
      {/* Input for note */}
      <form className = "note-form">
        <input 
          placeholder = "title" 
          id="noteTitle"
          required>  
        </input>
        <textarea 
          placeholder="Content"
          id="noteInput"
          rows = {10}
          required>  
        </textarea>
        <button
          id="submit"
          >
          Add Note
        </button>
      </form>
      <div className = "notes-grid">
        {notes.map((note)=>(
          <div className = "note-item">
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
