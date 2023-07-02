import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);

    const { notes, setNotes } = context;
    return (
        <div className='row'>
            {notes.map((note) => {
                return <Noteitem note={note} />
            })}
        </div>
    )
}

export default Notes
