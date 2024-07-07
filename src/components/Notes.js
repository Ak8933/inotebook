import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [note, setNote] = useState({
        etitle: "", edescription: "", etag: ""
    });

    const updateNote = (currentNote) => {
        setModalVisible(true);
        setNote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote />
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
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                <h3>Your notes</h3>
                {notes.map((note) => {
                    return <NoteItem note={note} key={note._id} updateNote={updateNote} />;
                })}
            </div>
        </>
    );
};

export default Notes;
