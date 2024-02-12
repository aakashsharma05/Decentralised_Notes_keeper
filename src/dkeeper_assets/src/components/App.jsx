import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper} from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  async function addNote(newNote) {
    await dkeeper.createNote(newNote.title,newNote.content);
    setNotes(prevNotes => {
      return [ newNote, ...prevNotes];
    });
  }

  useEffect(()=>{
    console.log("useeffect is trigerred.");
    fetchData();
  },[]);

  async function fetchData(){
    const newNotes = await dkeeper.readNotes();
    setNotes(newNotes);
  }

  async function deleteNote(id) {
    await dkeeper.deleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
