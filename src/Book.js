import React, { Component } from "react";
import { connect } from "react-redux";
import StarRatingDisplay from "./StarRatingDisplay";
import { addToCart } from "./store";

class Book extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const { book, auth, addToCart } = this.props;
    const { quantity } = this.state;
    const { onChange } = this;
    return (
      <div id="book">
        {auth.id ? (
          <h2 className="user-name">
            Welcome, {auth.firstName} {auth.lastName}!
          </h2>
        ) : null}
        <div id="book-info">
          <img className="photo-book" src={book.imageUrl}></img>
          <h3>{book.title}</h3>
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
              <span id="stock-left">
                Only {book.inventory} left in Stock - Order soon.
              </span>
            ) : book.inventory > 10 ? (
              <span id="in-stock">In Stock</span>
            ) : (
              <span id="out-stock">Out of Stock</span>
            )}
          </p>
          <StarRatingDisplay book={book} />
          <p>
            <span>Description:</span>{" "}
          </p>
          <p>{book.description}</p>
          <p>
            <span>Quantity:</span>{" "}
          </p>
          <select value={quantity} name="quantity" onChange={onChange}>
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
          <button onClick={() => addToCart(book, quantity * 1)}>
            Add to Cart
          </button>
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
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addToCart: (book, quantity) => {
      dispatch(addToCart(book, quantity, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
