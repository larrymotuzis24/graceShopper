import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBar = ({ books }) => {
  const [query, setQuery] = useState('');
  return (
    <div
      className="dropdown"
      style={{
        zIndex: '10',
      }}
    >
      <input
        // className="searchbar"
        // id="searchbar-input"
        type="text"
        class="form-control"
        placeholder="Search books by title"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div id="myDropdown" className="dropdown-content">
        {books
          .filter((book) => {
            if (query === '') {
              return book;
            } else if (book.title.toLowerCase().includes(query.toLowerCase())) {
              return book;
            }
          })
          .slice(0, 9)
          .map((book) => {
            if (query !== '') {
              return (
                <a
                  href={`#books/${book.id}`}
                  key={book.id}
                  style={{
                    display: 'block',
                    width: '100%',
                    boxSizing: 'border-box',
                    border: '1px solid black',
                    marginTop: '-1px',
                  }}
                  className="text-link p-2"
                >
                  {book.title}
                </a>
              );
            }
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatch)(SearchBar);
