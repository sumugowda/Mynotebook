import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const context = useContext(noteContext);
  const { deleteNote  } = context;
    const { note, updateNote } = props;
    return (
        <>
            <div className="col-md-3 m-2 w-30">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title} <sub><sup>({(note.date)})</sup></sub> </h5>
                        <hr />
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <div className="d-flex justify-content-evenly">
                            <i className="fa-solid fa-trash-can p-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted note", "danger") }}></i>
                            <i className="fa-solid fa-pen-to-square p-2" onClick={()=>{updateNote(note)}} >  </i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem