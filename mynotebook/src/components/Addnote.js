import React, {useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


function Addnote(props) {
    const {showAlert} = props
    const context = useContext(noteContext);
    const {  addNote } = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const HSave = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag); 
        setNote({title:"", description:"", tag:""})
        showAlert("Note Added", "success")


    }
    const onchange = (e)=>{

        setNote({...note, [e.target.name]:e.target.value}); 
    }
  return (
     <div className='container my-4'>
    <h2 className='container'>Lets start writting</h2>
    <form className='m-3 p-3'>
      <div className="row p-2">
        <div className="col"> 
          <input type="text" className="form-control" placeholder="Title" aria-label="Title" name='title' onChange={onchange} id='title'  value={note.title} minLength={5} required/>
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Tag" aria-label="Tag" name='tag' value={note.tag} onChange={onchange} id='tag'/>
        </div>
      </div>
      <div className="row p-2">
        <div className="col">
          <input type="text" className="form-control" placeholder="Description" aria-label="Description" name='description' onChange={onchange} id='description' value={note.description} minLength={5} required/>
        </div>
      </div>
      <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary bg-dark m-2" onClick={HSave}>Save</button>
    </form>
  </div>
  )
}

export default Addnote