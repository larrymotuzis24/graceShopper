import React from "react";
import { connect } from "react-redux";
import StarRatingDisplay from "./StarRatingDisplay";

const Book = ({history, book, auth}) => {
        return (
            <div id="book">
                {
                    auth.id ? <h2 className='user-name'>
                    Welcome, {auth.firstName} {auth.lastName}!
                    </h2> : null
                }
                <div id="book-info">
                    <img
                    className="photo-book"
                    src={book.imageUrl}>
                    </img>
                    <h3>{book.title}</h3>
                    <p><span>Author:</span> {book.publisher}</p>
                    <p><span>Year:</span>  { new Date(book.year).getFullYear()}</p>
                    <p><span>Price:</span>  $ {book.price}</p>
                    <p><span>Stock:</span>  {book.inventory}</p>
                    <StarRatingDisplay  book={book} /> 
                    <p><span>Description:</span> </p>
                    <p>{book.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        )
    
    
}

const mapStateToProps = (state, {match}) => {
    const id = match.params.id * 1;
    let book = state.books.find((book) => book.id === id) || {};

    return {
        auth: state.auth,
        book
    }
}


export default connect(mapStateToProps)(Book);