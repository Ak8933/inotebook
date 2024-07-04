import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <>
      <div className="container">
        <h3>Add a note</h3>
        <form className='my-4'>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div className="container">
          <h3>Your notes</h3>
          {notes.map((note) => {
            return (
              <div>{note.title} </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home
