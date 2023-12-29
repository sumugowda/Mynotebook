import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)


    //get notes NOTE
    const getNotes = async() => {
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzUwYjBmYTdiMzc4MmRmNzExMzllIn0sImlhdCI6MTcwMDE5Njk1Mn0._f96LYzTW5DJhEEocC79pZ0pFmIj9tQhd_vSTMizPog"
            },
          });
          const rejson = await response.json(); // parses JSON response into native JavaScript objects
          setNotes(rejson)
    }
    //ADD NOTE
    const addNote = async(title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzUwYjBmYTdiMzc4MmRmNzExMzllIn0sImlhdCI6MTcwMDE5Njk1Mn0._f96LYzTW5DJhEEocC79pZ0pFmIj9tQhd_vSTMizPog"
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
          });
          const note = await response.json(); // parses JSON response into native JavaScript objects
          console.log(localStorage.getItem('token'))
        setNotes(notes.concat(note))

    }
    //DELETE NOTE
    const deleteNote = async(id) =>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzUwYjBmYTdiMzc4MmRmNzExMzllIn0sImlhdCI6MTcwMDE5Njk1Mn0._f96LYzTW5DJhEEocC79pZ0pFmIj9tQhd_vSTMizPog"
        },    
      });
      const json = await response.json();
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);

    }
    //EDIT NOTE
    const editNote = async(id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1MzUwYjBmYTdiMzc4MmRmNzExMzllIn0sImlhdCI6MTcwMDE5Njk1Mn0._f96LYzTW5DJhEEocC79pZ0pFmIj9tQhd_vSTMizPog"
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
          });
          const rejson = response.json(); // parses JSON response into native JavaScript objects
        

        let newNotes = JSON.parse(JSON.stringify(notes))
        for(let index = 0; index< newNotes.length; index++){
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;