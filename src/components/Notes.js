import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, addNote} = context;
    return (
        <>
        <AddNote/>
            <div className="row">
                <h3>Your notes</h3>
                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id}/>
                })}
            </div>
        </>
    )
}

export default Notes
