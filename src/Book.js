import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRatingDisplay from './StarRatingDisplay';
import { addToCart, addToWishList, fetchReviews, fetchUsers, fetchBooks } from './store';
import Footer from './Footer';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchReviews();
    if (Object.keys(this.props.auth).length > 0) {
      this.props.fetchUsers();
    }
    this.props.fetchBooks();
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const { book, auth, addToCart, reviews, users, addToWishList } = this.props;
    const { quantity } = this.state;
    const { onChange } = this;
    const reviewsBook =
      reviews.filter((review) => review.productId === book.id) || [];
    
    return (
      <div id="book-page" className="container">
        <div id="book-info-container" className="d-flex gap-5">
          <div
            id="book-image"
            className="d-flex justify-content-center align-items-center w-50 p-5 rounded-4"
            style={{ backgroundColor: 'black' }}
          >
            <img className="" src={book.imageUrl ? book.imageUrl : null}></img>
          </div>
          <div id="book-info" className="d-flex flex-column w-50 gap-3">
            <div>
              <h1 className="display-5">{book.title}</h1>
              <h1 className="display-5">{book.author}</h1>
            </div>
            {book.description}
            <p className="m-0">${book.price}</p>
            <p className="m-0">
              <b>Year</b> {new Date(book.year).getFullYear()}
            </p>
            <StarRatingDisplay book={book} />

            {book.inventory >= 1 && book.inventory <= 10 ? (
              <span id="stock-left">
                Only {book.inventory} left in Stock - Order soon.
              </span>
            ) : book.inventory > 10 ? (
              <span id="in-stock">In Stock</span>
            ) : (
              <span id="out-stock">Out of Stock</span>
            )}
            <div className="form-floating me-auto w-50">
              <select
                value={quantity}
                name="quantity"
                onChange={onChange}
                className="form-select"
                disabled={book.inventory < 1}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <label htmlFor="floatingSelect">Select Quantity</label>
            </div>
            <button
              onClick={() => addToCart(book, quantity * 1)}
              className="btn btn-primary w-50"
              disabled={book.inventory < 1}
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishList(auth, book, quantity * 1)}
              className="btn btn-secondary w-50"
              disabled={book.inventory < 1}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
        <br></br>
        <div id="review-book">
          <h3>Reviews</h3>
          {reviewsBook.length > 0 ? (
            reviewsBook.map((review) => {
              const reviewAuthor =
                users.find((user) => user.id === review.userId) || {};
              return (
                <div key={review.id}>
                  <div>
                    <p>
                      <span className="review">{review.review}</span>
                      <span className="review-date">{` - Written on: ${new Date(
                        review.review_date
                      ).getMonth() + 1}/${new Date(
                        review.review_date
                      ).getDate()}/${new Date(
                        review.review_date
                      ).getFullYear()}`}</span>
                      {!Object.keys(auth).length ? (
                        <span className="review-author"> by anonymous.</span>
                      ) : (
                        <span className="review-author">
                          {' '}
                          by {reviewAuthor.firstName} {reviewAuthor.lastName}.
                        </span>
                      )}
                    </p>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <span className="no-review">{`No Reviews for "${book.title}"`}</span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const id = match.params.id * 1;
  let book = state.books.find((book) => book.id === id) || {};

  return {
    auth: state.auth,
    book,
    reviews: state.reviews,
    users: state.users,
    books: state.books
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addToCart: (book, quantity) => {
      dispatch(addToCart(book, quantity, history));
    },
    addToWishList: (user, book, quantity) =>
      dispatch(addToWishList(user, book, quantity, history)),
    fetchReviews: () => dispatch(fetchReviews()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchBooks: () => dispatch(fetchBooks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
