import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, addToWishList, deleteItemFromWishList } from './store';
import { FaClipboardList } from 'react-icons/fa';

const WishList = ({
  wishList,
  auth,
  books,
  addToWishList,
  addToCart,
  deleteItemFromWishList,
}) => {
  console.log(wishList);
  wishList = wishList.sort((a, b) => {
    if (a.productId < b.productId) {
      return -1;
    }
    if (a.productId > b.productId) {
      return 1;
    }
    return 0;
  });
  console.log(wishList);
  return (
    <div className="container mt-4" style={{ minHeight: '90vh' }}>
      {wishList.length > 0 ? (
        <div className="w-100">
          <h2 className="mb-5">{auth.firstName}'s Wishlist</h2>
          {/* <hr /> */}
        </div>
      ) : null}

      {auth.id && wishList.length > 0 ? (
        <div className="row row-cols-2 row-cols-lg-4">
          {wishList.map((wishList) => {
            const book =
              books.find((book) => book.id === wishList.productId) || {};
            return (
              <div key={wishList.id} className="col-3">
                <div
                  className="card border-0 bg-transparent mb-5"
                  style={{ background: '#eef7ea' }}
                >
                  <Link
                    id={book.id}
                    to={`/books/${book.id}`}
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
                    <div className="mt-4">
                      <a
                        href="/wishList"
                        onClick={() =>
                          addToCart(wishList, book, wishList.quantity)
                        }
                        className="text-link me-4"
                      >
                        ADD TO CART
                      </a>
                      <a
                        href="/wishList"
                        onClick={() => deleteItemFromWishList(wishList)}
                        className="text-link"
                      >
                        REMOVE
                      </a>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="container h-75 text-center" style={{}}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <FaClipboardList size={180} />
            <h3 className="d-block mt-4 mb-5">Your wishlist is empty</h3>
            <a type="button" className="btn btn-dark" href="#books">
              BROWSE BOOKS
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addToWishList: (user, book, quantity) => {
      dispatch(addToWishList(user, book, quantity, history));
    },
    addToCart: (wishList, book, quantity) => {
      dispatch(addToCart(book, quantity, history)),
        dispatch(deleteItemFromWishList(wishList, history));
    },
    deleteItemFromWishList: (wishListItem) => {
      dispatch(deleteItemFromWishList(wishListItem, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
