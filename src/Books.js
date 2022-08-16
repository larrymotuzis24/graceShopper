import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Books extends Component {
  render() {
    const { books } = this.props;
    console.log(books);
    return (
      <div>
        <h1>Books</h1>
        {books.map((book) => {
          return (
            <Link to="" key={book.id}>
              {book.title} {book.author}
            </Link>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Books);
