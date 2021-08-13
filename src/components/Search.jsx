import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ handleSearchNote }) => {
  return (
    <div className="search">
      <MdSearch className="search-icon" size="1.3em" />

      <input
        type="text"
        placeholder="Type to search"
        className="search-input"
        onChange={(event) => handleSearchNote(event.target.value)}
      ></input>
    </div>
  );
};

export default Search;
