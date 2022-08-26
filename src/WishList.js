import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, addToWishList, deleteItemFromWishList } from "./store";

const WishList = ({wishList, auth, books, addToWishList, addToCart, deleteItemFromWishList}) =>{

    console.log(wishList)
    wishList = wishList.sort((a, b) => {
        if (a.productId < b.productId) {
            return -1;
        }
        if (a.productId > b.productId) {
            return 1;
        }
        return 0;
    });
    console.log(wishList)
    return (
        <div id="block-wish-list-page">
            {
                auth.id ? (
                    <h2>
                      Welcome, {auth.firstName} {auth.lastName}!
                    </h2>
                ) : null
            }
            <h2 className="wishlist-title">WishList</h2>
            <div id="wishlist-page">
                <div id="wishlist-cart">
                    <hr/>
                    {
                        auth.id && wishList.length > 0 ? wishList.map(wishList => {
                            const book = books.find(book => book.id === wishList.productId) || {};
                            return (
                                <main id="display-wishlist" key={wishList.id}>
                                    <img
                                    src={book.imageUrl}
                                    id="display-photo-wishlist"
                                    >
                                    </img>
                                    <div id="div-info-wishlist">
                                        <h5>{book.title}</h5>
                                        <p>
                                            <span>Author:</span> {book.author}
                                        </p>
                                        <p>
                                            {book.inventory >= 1 &&
                                            book.inventory <= 10 ? (
                                                <span id="stock-left">
                                                    Only {book.inventory} left in Stock - Order
                                                    soon.
                                                </span>
                                            ) : book.inventory > 10 ? (
                                                <span id="in-stock">In Stock</span>
                                            ) : (
                                                <span id="out-stock">Out of Stock</span>
                                            )}
                                        </p>
                                        <p>
                                            <span>Quantity</span>
                                        </p>
                                        <select
                                            defaultValue={wishList.quantity}
                                            onChange={ev => addToWishList(auth, book, ev.target.value * 1)}
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
                                        <Link
                                        to='/wishList'
                                        onClick={() => deleteItemFromWishList(wishList)}>
                                            Delete Item
                                        </Link>
                                        <Link
                                        to='/wishList'
                                        onClick={() => addToCart(wishList, book, wishList.quantity)}>
                                            Add Item to Cart
                                        </Link>
                                    </div>
                                </main>
                            )
                        }) : <p>No items added to your Wishlist!</p>
                    }
                    <hr/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return state;
}

const mapDispatchToProps = (dispatch, {history}) =>{
    return {
        addToWishList: (user, book, quantity) => {
            dispatch(addToWishList(user, book, quantity, history))
        },
        addToCart: (wishList, book, quantity) => {
            dispatch(addToCart(book, quantity, history)),
            dispatch(deleteItemFromWishList(wishList, history))
        },
        deleteItemFromWishList: (wishListItem) => {
            dispatch(deleteItemFromWishList(wishListItem, history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);