
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Akarsh",
        "class": "12a"
    }
    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(()=>{
            setState({"name": "Pratik", "class": "12b"})
        },2000)
    }
return (
    <NoteContext.Provider value={{state,update}}>
        {props.children}
    </NoteContext.Provider>

)
}

export default NoteState;