import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);


    //Get all notes
    const getNotes = async() => {
        //API call to fetch all notes from database
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NGRlNmM2MGNlYTI3NzkyMjk2YzFkIn0sImlhdCI6MTcxOTk5NTI0OH0.7uoZ3q8VQ4RNTpyVuFJ5uNmy6AZ_iKlTuZPqW8hwmdE'
            }
        })
        const json = await response.json()
        //update UI
        setNotes(json)
    }


    //Add Note
    const addNote = async(title, description, tag) => {
        //API call to add a note
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NGRlNmM2MGNlYTI3NzkyMjk2YzFkIn0sImlhdCI6MTcxOTk5NTI0OH0.7uoZ3q8VQ4RNTpyVuFJ5uNmy6AZ_iKlTuZPqW8hwmdE'
            },
            body: JSON.stringify({title,description,tag})

        })

        const note = await response.json()
        setNotes(notes.concat(note))
    }



    //Delete Note
    const deleteNote = async(id) => {
        //API call to delete note from database
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NGRlNmM2MGNlYTI3NzkyMjk2YzFkIn0sImlhdCI6MTcxOTk5NTI0OH0.7uoZ3q8VQ4RNTpyVuFJ5uNmy6AZ_iKlTuZPqW8hwmdE'
            }
        })
        
        //logic to update UI
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }


    //Update Node
    const editNote = async (id, title, description, tag) => {

        //API call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NGRlNmM2MGNlYTI3NzkyMjk2YzFkIn0sImlhdCI6MTcxOTk5NTI0OH0.7uoZ3q8VQ4RNTpyVuFJ5uNmy6AZ_iKlTuZPqW8hwmdE'
            },
            body: JSON.stringify({title, description,tag})
        })

    //logic to edit note 
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
        }
    }
    setNotes(newNotes);
}

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
        {props.children}
    </NoteContext.Provider>

)
}

export default NoteState;