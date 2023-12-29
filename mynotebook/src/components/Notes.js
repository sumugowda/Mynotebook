import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  const {showAlert} = props;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let history = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
       getNotes()
    }
    else{
      history('/login')
    }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentnote) => {

    ref.current.click();
    setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
  }

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})


  const HSave = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    showAlert("Edited successfully","success")


}
const onchange = (e)=>{

    setNote({...note, [e.target.name]:e.target.value}); 
}

  return (
    <>
      <Addnote showAlert={showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className='container my-4'>
                <form className='m-3 p-3'>
                  <div className="row p-2">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Title" aria-label="Title" name='etitle'  value={note.etitle} onChange={onchange} id='etitle' minLength={5} required />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Tag" aria-label="Tag" name='etag' onChange={onchange} value={note.etag} id='etag' />
                    </div>
                  </div>
                  <div className="row p-2">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Description" aria-label="Description" name='edescription' value={note.edescription} onChange={onchange} id='edescription' minLength={5} required />
                    </div>
                  </div>
                </form>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={HSave}>Save changes</button>
            </div>
          </div> 
        </div>
      </div>
      <h2 className='container'>Look up all your notes here</h2>
      <div className='container'>
      {notes.length === 0 && "Start writing"}
      </div>

      <div className='row my-3'>{notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />;
      })}</div>
    </>
  )
}
