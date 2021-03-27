import React, { useState } from 'react'
import './SearchBar.css';

function SearchBar({ setLocationHandler }) {
    const [query, setQuery] = useState('');

    function handleClick() {
        setLocationHandler(query);
    };

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setLocationHandler(query);
        }
    };

    return (
        <span className="searchbar">
      <input
          type="text"
          name="search"
          value={query}
          onKeyDown={keyPressCheck}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek een stad in Nederland"
      />
      <button
          type="button"
          onClick={handleClick}
      >
        Zoek
      </button>
    </span>
    );
};

export default SearchBar;
