import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatingDisplay from "./StarRatingDisplay";
import Pagination from './Pagination';

class Books extends Component {

  constructor(){
    super();
    this.state = {
      currPage: 1,
      booksPerPage: 6,
    }
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  setCurrentPage(curPage) {
    this.setState({ currPage: curPage });
  }

  render() {
    const { books, auth } = this.props;
    const pageNumber = this.props.match.params.id * 1;
    const { setCurrentPage } = this;
    const idxOfLastRecord = this.state.currPage * this.state.booksPerPage;
    const idxOfFirstRecord = idxOfLastRecord - this.state.booksPerPage;
    const listBooks = books.slice(idxOfFirstRecord, idxOfLastRecord);
    const numPages = Math.ceil(books.length / this.state.booksPerPage);

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
            listBooks.map(book => {
              return (
                <div key={book.id} className='book-info'>
                  <img
                    className="photo-books"
                    src={book.imageUrl}>
                  </img>
                  <h3>
                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                  </h3>
                  <p><span>Author:</span> {book.publisher}</p>
                  <p><span>Year:</span>  {book.year}</p>
                  <p><span>Price:</span>  $ {book.price}</p>
                  <p><span>Stock:</span>  {book.inventory}</p>
                  <StarRatingDisplay  book={book} /> 
                  <button>Add to Cart</button>
                </div>
              )
            })
          }
        </div>
        <Pagination
          numPages={numPages}
          setCurrentPage={setCurrentPage}
          pageNumber={pageNumber}
          flag='books'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Books);
