
//import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);


    //Get all notes
    const getNotes = async() => {


        //TODO API call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NGRlNmM2MGNlYTI3NzkyMjk2YzFkIn0sImlhdCI6MTcxOTk5NTI0OH0.7uoZ3q8VQ4RNTpyVuFJ5uNmy6AZ_iKlTuZPqW8hwmdE'
            }
        })
       
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }


    //Add Note
    const addNote = async(title, description, tag) => {


        //TODO API call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NGRlNmM2MGNlYTI3NzkyMjk2YzFkIn0sImlhdCI6MTcxOTk5NTI0OH0.7uoZ3q8VQ4RNTpyVuFJ5uNmy6AZ_iKlTuZPqW8hwmdE'
            },
            body: JSON.stringify({title,description,tag})
        })
       

        let note = {
            "_id": "6686f44bc577f678b5846428b30",
            "user": "6684de6c60cea27792296c1d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }



    //Delete Note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }


    //Update Node
    const editNote = async (id, title, description, tag) => {
        //API call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NGRlNmM2MGNlYTI3NzkyMjk2YzFkIn0sImlhdCI6MTcxOTk5NTI0OH0.7uoZ3q8VQ4RNTpyVuFJ5uNmy6AZ_iKlTuZPqW8hwmdE'
            },
            body: JSON.stringify({title, description,tag})
        })
        const res =  response.json();

    //logic to edit note
    for (let index = 0; index < notes.length; index++) {
        if (notes[index]._id === id) {
            notes[index].title = title;
            notes[index].description = description;
            notes[index].tag = tag;
        }
    }
}

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
        {props.children}
    </NoteContext.Provider>

)
}

export default NoteState;