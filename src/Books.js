import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatingDisplay from './StarRatingDisplay';
import Pagination from './Pagination';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

class Books extends Component {
  constructor() {
    super();
    this.state = {
      currPage: 1,
      booksPerPage: 6,
    };
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  setCurrentPage(currPage) {
    this.setState({ currPage: currPage });
  }

  render() {
    const pageNumber = this.props.match.params.id * 1;
    const { books, auth } = this.props;
    const { setCurrentPage } = this;
    let idxOfLastRecord;
    if (!pageNumber) {
      idxOfLastRecord = this.state.currPage * this.state.booksPerPage;
    } else {
      idxOfLastRecord = pageNumber * this.state.booksPerPage;
    }

    const idxOfFirstRecord = idxOfLastRecord - this.state.booksPerPage;
    const listBooks = books.slice(idxOfFirstRecord, idxOfLastRecord);
    const numPages = Math.ceil(books.length / this.state.booksPerPage);

    return (
      <div id="books-page">
        {auth.id ? (
          <h2 className="user-name">
            Welcome, {auth.firstName} {auth.lastName}!
          </h2>
        ) : null}
        <h2>Books</h2>
        <div class="container">
          <div class="row" style={{ gap: '2rem' }}>
            {listBooks.map((book) => {
              return (
                <Link to={`books/${book.id}`} style={{ display: 'contents' }}>
                  <Card
                    style={{
                      width: '18rem',
                      padding: '0',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={book.imageUrl}
                      style={{
                        height: '400px',
                        objectFit: 'contain',
                        backgroundColor: 'black',
                        padding: '2rem',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>{book.author}</Card.Text>
                      <Card.Text>{book.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
                // <div key={book.id} className="homeBookDiv">
                //   <img src={book.imageUrl} />
                //   <h5>
                //     {' '}
                //     <Link to={`books/${book.id}`}> {book.title} </Link>
                //   </h5>
                //   <p> {book.author}</p>
                //   <StarRatingDisplay book={book} />
                // </div>
              );
            })}
            {/* <div class="col card">1</div>
          <div class="col card">2</div>
          <div class="col card">3</div> */}
          </div>
          {/* <div class="row">
          <div class="col card">4</div>
          <div class="col card">5</div>
          <div class="col card">6</div>
        </div> */}
        </div>
        {/* <div id="books">
          {listBooks.map((book) => {
            return (
              <div key={book.id} className="book-info">
                <img className="photo-books" src={book.imageUrl}></img>
                <h3>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </h3>
                <p>
                  <span>Author:</span> {book.publisher}
                </p>
                <p>
                  <span>Year:</span> {new Date(book.year).getFullYear()}
                </p>
                <p>
                  <span>Price:</span> $ {book.price}
                </p>
                <p>
                  <span>Stock:</span> {book.inventory}
                </p>
                <StarRatingDisplay  book={book} /> 
                <button>Add to Cart</button>
              </div>
            );
          })}
        </div> */}
        <Pagination
          numPages={numPages}
          setCurrentPage={setCurrentPage}
          pageNumber={pageNumber}
          flag="books"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ books, auth }) => {
  return {
    books,
    auth,
  };
};

export default connect(mapStateToProps)(Books);
