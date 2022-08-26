import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatingDisplay from './StarRatingDisplay';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

class Books extends Component {
  constructor() {
    super();
    this.state = {
      currPage: 1,
      booksPerPage: 16,
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
        {/* <div className="row" style={{ gap: '2rem' }}>
          <div className="row row-cols-2 row-cols-lg-4">
            {listBooks.map((book) => {
              return (
                <div className="col">
                  <div
                    key={book.id}
                    className="card border-0 bg-transparent mb-5"
                    style={{ background: '#eef7ea' }}
                  >
                    <Link
                      id={book.id}
                      to={`books/${book.id}`}
                      className="text-decoration-none"
                    >
                      <div style={{ height: '400px' }}>
                        <img
                          src={book.imageUrl}
                          style={{
                            height: '100%',
                            objectFit: 'contain',
                            backgroundColor: 'black',
                            padding: '20%',
                          }}
                          className="rounded-4 mb-2 card-img-top"
                        />
                      </div>
                      <div
                        className="card-body pt-3 pb-0 px-0"
                        style={{ background: '#eef7ea' }}
                      >
                        <p className="my-0 text-black lead">{book.title}</p>
                        <p className="my-0 text-black lead">{book.author}</p>
                        <p className="my-0 text-black lead">${book.price}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

        <div id="search-books">
          <SearchBar />
        </div>
        <div id="books-category">
          <ul>
            {categories.map((category) => {
              return (
                <button
                  onClick={onChange}
                  name="option"
                  key={category.id}
                  value={category.id}
                >
                  {category.category}
                </button>
              );
            })}
          </ul>
          <select onChange={onChange} value={option} name="option">
            <option value="">All</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row" style={{ gap: '2rem' }}>
          <div className="row row-cols-2 row-cols-lg-4">
            {listBooks.map((book) => {
              return (
                <div key={book.id} className="col">
                  <div
                    className="card border-0 bg-transparent mb-5"
                    style={{ background: '#eef7ea' }}
                  >
                    <Link
                      id={book.id}
                      to={`books/${book.id}`}
                      className="text-decoration-none"
                    >
                      <div style={{ height: '400px' }}>
                        <img
                          src={book.imageUrl}
                          style={{
                            height: '100%',
                            objectFit: 'contain',
                            backgroundColor: 'black',
                            padding: '20%',
                          }}
                          className="rounded-4 mb-2 card-img-top"
                        />
                      </div>
                      <div
                        className="card-body pt-3 pb-0 px-0"
                        style={{ background: '#eef7ea' }}
                      >
                        <p className="my-0 text-black lead">{book.title}</p>
                        <p className="my-0 text-black lead">{book.author}</p>
                        <p className="my-0 text-black lead">${book.price}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
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

const mapStateToProps = ({ books, auth, cart, categories }) => {
  return {
    books,
    auth,
    cart,
    categories,
  };
};

export default connect(mapStateToProps)(Books);
