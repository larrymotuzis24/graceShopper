import axios from "axios";

const wishList = (state = [], action) => {
  if (action.type === "SET_WISH_LIST") {
    state = action.wishList
  }
  if (action.type === "ADD_WISH_LIST") {
    state = state.map(wishList => wishList.productId !== action.wishList.productId ? wishList : action.wishList );
    // state = [...state, action.wishList]
  }
  console.log(state);
  return state;
};

export const fetchWishList = (user) => {
  return async (dispatch) => {
      console.log(user);
    const response = await axios.get(`/api/orders/wish/${user.id}`, {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });
    dispatch({ type: "SET_WISH_LIST", wishList: response.data });
  };
};

export const addToWishList = (user, book, quantity, history) => {
  return async (dispatch) => {
    const response = await axios.put(
      `api/orders/wish/${book.id}`,
      {
        userId: user.id,
        productId: book.id,
        quantity: quantity,
      },
      {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    dispatch({ type: "ADD_WISH_LIST", wishList: response.data });
    history.push("/books");
  };
};

export default wishList;
