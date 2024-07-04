
//import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6685a0e13c005bd4c5b4e67b",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 3",
            "description": "the description 3",
            "tag": "personal",
            "date": "2024-07-03T19:05:05.482Z",
            "__v": 0
        },
        {
            "_id": "6686f43cc573f6b584642b2e",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 1",
            "description": "the description 1",
            "tag": "personal 1",
            "date": "2024-07-04T19:13:00.025Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc573f6b584642b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        },
        {
            "_id": "6686f455c573f6b584642b32",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 4",
            "description": "the description 4",
            "tag": "personal 4",
            "date": "2024-07-04T19:13:25.357Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc573f6b584642b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc573f6b584642b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        },
        {
            "_id": "6686f44bc573f6b584642b30",
            "user": "6684de6c60cea27792296c1d",
            "title": "My title 2",
            "description": "the description 2",
            "tag": "personal 2",
            "date": "2024-07-04T19:13:15.933Z",
            "__v": 0
        }
    ]
   
    const [notes, setNotes] = useState(notesInitial);
return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>

)
}

export default NoteState;