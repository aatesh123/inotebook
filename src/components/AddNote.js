import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  //this is state for notes and setnotes
  const { addNote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    // this is for avoiding page reloading
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    //syntax
    // remember for onchange text i.e while changing text in form automatically change
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
