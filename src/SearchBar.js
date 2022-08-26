import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBar = ({ books }) => {
  const [query, setQuery] = useState('');
  return (
    <div className="dropdown">
      <div id="myDropdown" className="dropdown-content">
        <input
          className="searchbar"
          id="searchbar-input"
          placeholder="Search by title"
          onChange={(e) => setQuery(e.target.value)}
        />

        {books
          .filter((book) => {
            if (query === '') {
              return book;
            } else if (book.title.toLowerCase().includes(query.toLowerCase())) {
              return book;
            }
          })
          .map((book) => {
            if (query !== '') {
              return (
                <p key={book.id}>
                  {' '}
                  <Link to={`/books/${book.id}`}> {book.title} </Link>{' '}
                </p>
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
