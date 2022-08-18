import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    state = action.cart;
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const addToCart = (book, quantity, history) => {
  return async (dispatch) => {
    const response = await axios.put(
      "/api/orders/cart",
      { product: book, quantity: quantity },
      {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "SET_CART", cart: response.data });
    history.push('/books')
  };
};

export const updateLineItem = (book, quantity, history) => {
  return async(dispatch) => {
    const response = await axios.put(
      "/api/orders/cart",
      { product: book, quantity: quantity },
      {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "SET_CART", cart: response.data });
    history.push('/cart')
  }
}

export const deleteLineItem = (book, qtyZero, history) => {
  return async(dispatch) => {
    const response = await axios.put(
      "/api/orders/cart",
      { product: book, quantity: qtyZero },
      {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "SET_CART", cart: response.data });
    history.push('/cart')
  }
}

export default cart;
