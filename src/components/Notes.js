import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <>
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
