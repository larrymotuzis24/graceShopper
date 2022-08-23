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
      option: '',
      category: '',
    };
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setCurrentPage(currPage) {
    this.setState({ currPage: currPage });
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const pageNumber = this.props.match.params.id * 1;
    const { books, auth, cart, categories } = this.props;
    const { option } = this.state;
    const { setCurrentPage, onChange } = this;
    let idxOfLastRecord;
    if (!pageNumber) {
      idxOfLastRecord = this.state.currPage * this.state.booksPerPage;
    } else {
      idxOfLastRecord = pageNumber * this.state.booksPerPage;
    }

    const filteredBooks = books.filter(
      (book) => book.productCategoryId === option * 1
    );

    const idxOfFirstRecord = idxOfLastRecord - this.state.booksPerPage;
    const listBooks =
      filteredBooks.length === 0
        ? books.slice(idxOfFirstRecord, idxOfLastRecord)
        : filteredBooks.slice(idxOfFirstRecord, idxOfLastRecord);
    const numPages =
      filteredBooks.length === 0
        ? Math.ceil(books.length / this.state.booksPerPage)
        : Math.ceil(filteredBooks.length / this.state.booksPerPage);

    return (
      <div className="container">
        {/* {auth.id ? (
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
        ) : null} */}
        <div className="row" style={{ gap: '2rem' }}>
          <div className="row row-cols-2 row-cols-lg-4">
            {listBooks.map((book) => {
              return (
                <div className="col">
                  <div className="card border-0 mb-5">
                    <Link
                      id={book.id}
                      to={`/books/${book.id}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={book.imageUrl}
                        style={{
                          height: '400px',
                          objectFit: 'contain',
                          backgroundColor: 'black',
                          padding: '2rem',
                        }}
                        className="rounded-2 mb-2 card-img-top"
                      />
                      <div className="card-body p-0">
                        <p className="my-0 text-black">{book.title}</p>
                        <p className="my-0 text-black">{book.author}</p>
                        <p className="my-0 text-black">${book.price}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div class="col card">1</div>
          <div class="col card">2</div>
          <div class="col card">3</div> */}
        </div>
        {/* <div class="row">
          <div class="col card">4</div>
          <div class="col card">5</div>
          <div class="col card">6</div>
        </div> */}

        {/* <div id="books">
=======
        <div id='search-books'>
          <SearchBar />
        </div>
        <div id="books-category">
          <select onChange={ onChange } value= { option } name='option'>
            <option value=''>Select a Category</option>
              {
                categories.map(category => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  )
                })
              }
          </select>
        </div>
        <div id="books">
>>>>>>> main
          {listBooks.map((book) => {
            return (
              <div key={book.id} className="book-info">
                <img className="photo-books" src={book.imageUrl}></img>
                <h3>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </h3>
                <p>
                  <span>Author:</span> {book.author}
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
                <div>
                <StarRatingDisplay book={book} />
                </div>
                <button>
                  <Link to={`/books/${book.id}`}>See Book Description</Link>
                </button>
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

const mapStateToProps = ({ books, auth, cart, categories }) => {
  return {
    books,
    auth,
    cart,
    categories,
  };
};

export default connect(mapStateToProps)(Books);
