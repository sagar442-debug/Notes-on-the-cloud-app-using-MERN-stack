import NoteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
  const host = "http://localhost:8000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)



  // Get all Notes
  const getNotes = async () => {
    // Todo : api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5Nzk1YjUyYzFiZmFmMDU3OTlkNzRmIn0sImlhdCI6MTY4Nzk0NDYwMH0.1ilLSXAxMEuP1C_wu7MmusJDLyjUd_2CJc8Eb_ozMGE"
      },
      });
    const json = await response.json();
    setNotes(json);

}



  // Add a note
  const addNote = async (title, description, tag) => {
    // Todo : api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5Nzk1YjUyYzFiZmFmMDU3OTlkNzRmIn0sImlhdCI6MTY4Nzk0NDYwMH0.1ilLSXAxMEuP1C_wu7MmusJDLyjUd_2CJc8Eb_ozMGE"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    let note = {
      "_id": "649c03b559c54c19d450b21cb4",
      "user": "649795b52c1bfaf05799d74f",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-06-28T09:56:05.764Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }



  // Delete a note
  const deleteNote = async (id) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5Nzk1YjUyYzFiZmFmMDU3OTlkNzRmIn0sImlhdCI6MTY4Nzk0NDYwMH0.1ilLSXAxMEuP1C_wu7MmusJDLyjUd_2CJc8Eb_ozMGE"
      },
      });
   // Api Call
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5Nzk1YjUyYzFiZmFmMDU3OTlkNzRmIn0sImlhdCI6MTY4Nzk0NDYwMH0.1ilLSXAxMEuP1C_wu7MmusJDLyjUd_2CJc8Eb_ozMGE"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
