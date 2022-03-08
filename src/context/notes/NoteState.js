//this  is coming from noteContext file where new context is created
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesIntial = [];
  //usestate created
  const [notes, setnotes] = useState(notesIntial);
  //addnotes,deletenote,editNotes function we can directly access

 //get allnotes
 const getNote = async () => {
  //api call
  //fetch api syntax all data is coming from backend
  const response = await fetch(`${host}/api/notes/getnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
      localStorage.getItem('token')},
  });
  const json=await response.json()
  setnotes(json)
  
};




  //add a Note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note=await response.json();
    setnotes(notes.concat(note))
    
  };


  //delete a Note
  const deleteNote = async (id) => {
     //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
           localStorage.getItem('token'),
      },
      // body: JSON.stringify({ title, description, tag }),
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };



  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')},
      body: JSON.stringify({ title, description, tag }),
    });
     const json = await response.json();


    //logic to edit in client
    let newnotes=JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newnotes.length; i++) {
      const element = newnotes[i];
      if (element._id === id) {
        newnotes[i].title = title;
        newnotes[i].description = description;
        newnotes[i].tag = tag;
        break;
      }
    }
    setnotes(newnotes)
  };

  return (
    //syntax inclding value we are passing notes and setnotes
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote,getNote ,editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
// this notestate is used in app.js like <Notestate> {other as usual }<Notestate>
export default NoteState;
