import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import "./index.css";
import Search from "./components/Search";
import Header from "./components/Header";
import { MdSort } from "react-icons/md";
import moment from "moment";

function App() {
  // Create the count state.
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note",
      date: "17/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note",
      date: "16/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note",
      date: "18/04/2021",
    },
  ]);
  const today = new Date();
  const dd = today.getDate();

  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  const now = dd + "/" + mm + "/" + yyyy;
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: now,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }; // Return the App component.

  const handleSortNotes = () => {
    if (sort) {
      let sortedArray = notes.sort(
        (a, b) => moment(b).valueOf() - moment(a).valueOf()
      );
      setNotes(sortedArray);
      setSort(false);
    } else {
      let sortedArray = notes.sort(
        (a, b) => moment(a).valueOf() - moment(b).valueOf()
      );
      setNotes(sortedArray);
      setSort(true);
    }
  };
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />

        <Search handleSearchNote={setSearchText} />
        <div className="move-right">
          <MdSort className="save1" size="1.3em" onClick={handleSortNotes} />
        </div>
        <NotesList
          notes={notes.filter((notes) =>
            notes.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
