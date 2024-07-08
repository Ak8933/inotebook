import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const refClose = useRef(null)

   

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState({ id:"",
        etitle: "", edescription: "", etag: ""
    });

    const updateNote = (currentNote) => {
        setModalVisible(true);
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    };

    const closeModal = () => {
        setModalVisible(false);
    };
 
    const handleClick = (e) => {
       editNote(note.id, note.etitle, note.edescription, note.etag);
       props.showAlert("Updated Successfully!","success")
        refClose.current.click()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote  showAlert={props.showAlert}/>
            {/* <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setModalVisible(true)}
            >
                Launch demo modal
            </button> */}

            {modalVisible && (
                <div
                    className="modal fade show"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-4'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-info" onClick={handleClick}>
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className=" container row my-2">
                <h3>Your notes</h3>
                <div className="container mx-1">{notes.length===0 && 'No notes to display!'}</div>
                
                {notes.map((item) => {
                    return <NoteItem note={item} key={item._id} updateNote={updateNote} showAlert={props.showAlert}/>;
                })}
            </div>
        </>
    );
};

export default Notes;
