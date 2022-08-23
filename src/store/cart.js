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
  return async (dispatch, getState) => {
    if (!getState().auth.id) {
      const cartObj = [];
      if (!localStorage.getItem("lineItem")) {
        cartObj.push({
          product: book,
          qty: quantity,
        });
        localStorage.setItem("lineItem", JSON.stringify(cartObj));
      } else {
        const existLineItem = JSON.parse(localStorage.getItem("lineItem"));

        for (let i = 0; i < existLineItem.length; i++) {
          if (existLineItem[i].product.id === book.id) {
            existLineItem[i].product = book;
            existLineItem[i].qty = quantity;
          } else {
            const newItem = {
              product: book,
              qty: quantity,
            };
            if (
              !existLineItem.some((e) => e.product.id === newItem.product.id)
            ) {
              existLineItem.push(newItem);
            }
          }
        }
        localStorage.setItem("lineItem", JSON.stringify(existLineItem));
      }
    } else {
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
    }
    history.push("/books");
  };
};

export const updateLineItem = (book, quantity, history) => {
  return async (dispatch, getState) => {
    if (!getState().auth.id) {
      const cartObj = [];
      if (!localStorage.getItem("lineItem")) {
        cartObj.push({
          product: book,
          qty: quantity,
        });
        localStorage.setItem("lineItem", JSON.stringify(cartObj));
      } else {
        const existLineItem = JSON.parse(localStorage.getItem("lineItem"));

        for (let i = 0; i < existLineItem.length; i++) {
          if (existLineItem[i].product.id === book.id) {
            existLineItem[i].product = book;
            existLineItem[i].qty = quantity;
          } else {
            const newItem = {
              product: book,
              qty: quantity,
            };
            if (
              !existLineItem.some((e) => e.product.id === newItem.product.id)
            ) {
              existLineItem.push(newItem);
            }
          }
        }
        localStorage.setItem("lineItem", JSON.stringify(existLineItem));
      }
    } else {
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
    }
    if (history.location.pathname === "/order") {
      history.push("/order");
    } else {
      history.push("/cart");
    }
  };
};

export const deleteLineItem = (book, qtyZero, history) => {
  return async (dispatch, getState) => {
    if(!getState().auth.id && localStorage.getItem("lineItem")){
      const guestCart = JSON.parse(localStorage.getItem("lineItem"));
      for(let i = 0; i < guestCart.length; i++){
        if(guestCart[i].product.id === book.id){
          const idx = guestCart.indexOf(guestCart[i]);
          if(idx > -1){
            guestCart.splice(idx, 1)
          }
        }
      }
      localStorage.setItem("lineItem", JSON.stringify(guestCart));
    }else{
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
    }
    
    if (history.location.pathname === "/cart") {
      history.push("/cart");
    } else {
      history.push("/order");
    }
  };
};

export const createOrderFromCart = () => {
  return async(dispatch)=> {
    const userToken = window.localStorage.getItem('token')
    const response = await axios.put('/api/orders', {
      headers: {
        authorization: userToken
      }
    })
    dispatch({type: "SET_CART", cart: response.data});
  }
}

export default cart;
