import React from "react";
import "./styles.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm({ searchForEmployee }) {
  return (
    <form className="search form-inline">
      <div className="form-group">
        <input
          onChange={searchForEmployee}
          name="term"
          list="term"
          type="text"
          className="form-control"
          placeholder="Type Name to Search"
          id="term"
        />
      </div>
    </form>
  );
}

export default SearchForm;
