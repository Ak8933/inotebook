
//import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6685a0e13c0057bd4c5b4e67b",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 3",
            "description": "the description 3",
            "tag": "personal",
            "date": "2024-07-03T19:05:05.482Z",
            "__v": 0
        },
        {
            "_id": "6686f43cc5723f6b584642b2e",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 1",
            "description": "the description 1",
            "tag": "personal 1",
            "date": "2024-07-04T19:13:00.025Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc5763f6b584642b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        },
        {
            "_id": "66868f455c573f6b584642b32",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 4",
            "description": "the description 4",
            "tag": "personal 4",
            "date": "2024-07-04T19:13:25.357Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc5730f64584642b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc573f16b574642b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc577f6b5846428b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    //Add Note
    const addNote = (title, description, tag) => {
        console.log("Adding a new note");

        //TODO API call
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
        setNotes((prevNotes) => {
            return prevNotes.filter((noteItem) => noteItem.id !== id)
        })
    }


    //Update Node
    const updateNote = (id, title, description, tag) => {
        setNotes((prevNotes) => {
            return prevNotes.map((noteItem) => noteItem.id === id ? {
                ...noteItem, title, description, tag
            } : noteItem)
        })
    }

    return (
        <NoteContext.Provider value={{ notes, addNote,deleteNote,updateNote }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;