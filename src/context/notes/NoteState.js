import NoteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) =>{

    const notesInitial = [
        {
          "_id": "649c03b059c54c19d450bcb0",
          "user": "649795b52c1bfaf05799d74f",
          "title": "My title",
          "description": "Please wake me up early",
          "tag": "personal",
          "date": "2023-06-28T09:56:00.135Z",
          "__v": 0
        },
        {
          "_id": "649c03b059c54c19d450bcb0",
          "user": "649795b52c1bfaf05799d74f",
          "title": "My title",
          "description": "Please wake me up early",
          "tag": "personal",
          "date": "2023-06-28T09:56:00.135Z",
          "__v": 0
        },
        {
          "_id": "649c03b059c54c19d450bcb0",
          "user": "649795b52c1bfaf05799d74f",
          "title": "My title",
          "description": "Please wake me up early",
          "tag": "personal",
          "date": "2023-06-28T09:56:00.135Z",
          "__v": 0
        },
        {
          "_id": "649c03b059c54c19d450bcb0",
          "user": "649795b52c1bfaf05799d74f",
          "title": "My title",
          "description": "Please wake me up early",
          "tag": "personal",
          "date": "2023-06-28T09:56:00.135Z",
          "__v": 0
        },
        {
          "_id": "649c03b159c54c19d450bcb2",
          "user": "649795b52c1bfaf05799d74f",
          "title": "My title",
          "description": "Please wake me up early",
          "tag": "personal",
          "date": "2023-06-28T09:56:01.619Z",
          "__v": 0
        },
        {
          "_id": "649c03b559c54c19d450bcb4",
          "user": "649795b52c1bfaf05799d74f",
          "title": "My title",
          "description": "Please wake me up early",
          "tag": "personal",
          "date": "2023-06-28T09:56:05.764Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
           {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState ;
