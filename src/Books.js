import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Books extends Component {
  render() {
    const { books, auth } = this.props;
    return (
      <div id='books-page'>
        {
          auth.id ? <h2 className='user-name'>
          Welcome, {auth.firstName} {auth.lastName}!
        </h2> : null
        }
        <h2>Books</h2>
        <div id='books'>
          {
            books.map(book => {
              return (
                <div key={book.id} className='book-info'>
                  <img
                    className="photo-books"
                    src={book.imageUrl}>
                  </img>
                  <h3>
                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                  </h3>
                  <p>{book.publisher}</p>
                  <p>{book.year}</p>
                  <p>$ {book.price}</p>
                  <p>{book.inventory}</p>
                  <p>{book.rating}</p>
                </div>
              )
            })
          }
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Books);
