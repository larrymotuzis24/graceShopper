import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRatingDisplay from "./StarRatingDisplay";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

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
    const { books, auth, cart } = this.props;
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
        {cart.lineItems.length > 0 ? (
          <div id="cart-books">
            <img
              src={cart.lineItems[cart.lineItems.length - 1].product.imageUrl}
              className='photo-last-item'
            ></img>{" "}
            <p>
              <span>Last Item added to the Cart</span>
            </p>
          </div>
        ) : null}
        <h2>Books</h2>
        <div id="books">
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
                  {book.inventory >= 1 && book.inventory <= 10 ? (
                    <span id="stock-left">Only {book.inventory} left in Stock - Order soon.</span>
                  ) : book.inventory > 10 ? (
                    <span id="in-stock">In Stock</span>
                  ) : (
                    <span id="out-stock">Out of Stock</span>
                  )}
                </p>
                <StarRatingDisplay book={book} />
                <button>
                  <Link to={`/books/${book.id}`}>See Book Description</Link>
                </button>
              </div>
            );
          })}
        </div>
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

const mapStateToProps = ({ books, auth, cart }) => {
  return {
    books,
    auth,
    cart,
  };
};

export default connect(mapStateToProps)(Books);
