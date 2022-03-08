import React, { useContext, useEffect, useRef,useState } from "react";
//useref we can give refrence
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from 'react-router-dom' ;
// this is same use usehistory to redirect at any page


const Note = () => {
  //syntax
  const context = useContext(noteContext);
  const navigate = useNavigate();
  //this is state for notes and setnotes
  const { notes, getNote,editNote } = context;
  // const { addNote  } = context;
  //same as component did mount
 
  const ref = useRef(null);
  const refclose=useRef(null)
  const [note, setnote] = useState({id:"",etitle: "",edescription: "",etag: ""})
  const updateNote = (currentnote) => {
    //this is for paste current info on modal
    ref.current.click();
    setnote({id:currentnote._id,etitle : currentnote.title , edescription: currentnote.description,etag: currentnote.tag})
  };
  const handleClick =()=>{
    // this is for avoiding page reloading
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        // e.preventDefault();
  }
  const onChange =(e)=>{
    //syntax
    // remember for onchange text i.e while changing text in form automatically change 
    setnote({...note,[e.target.name]: e.target.value})
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
      // navigate("/")
    }
    else{
        navigate("/login")
    }
  }, [])
  return (
    <>
      <AddNote />
      {/* this is for modal d- none for hide button*/}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etag}
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Add Note
                </button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes </h2>
        {notes.map((note) => {
          //  key is used to provide uniqueness
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Note;
