import React, { useState } from "react";
import Note from "./Note";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const charcterLimit = 200;

  const handleChange = (event) => {
    if (charcterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };
  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{charcterLimit - noteText.length} Remaning</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
