import axios from "axios";
import {reducer as toastrReducer} from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'
const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    state = action.auth;
  }
  return state;
};

export const logout = (history) => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
    history.push("/");
  };
};

export const register = (user, history) => {
  return async (dispatch) => {
    const credentials = {username: user.username, password: user.password}
    let response = await axios.post("/users", user);
    response = await axios.post("/api/sessions", credentials);
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      toastr.success('User Created', 'You are now registerd and can login.')
      dispatch({ auth, type: "SET_AUTH" });
    history.push("/");
  };
};

export const exchangeToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
    }
  };
};

export const login = (credentials, history) => {
  return async (dispatch) => {
    if (localStorage.getItem("lineItem")) {
      const guestCart = JSON.parse(localStorage.getItem("lineItem"));
      let response = await axios.post("/api/sessions", credentials);
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
      
      for (let i = 0; i < guestCart.length; i++) {
        const response = await axios.put(
          "/api/orders/cart",
          { product: guestCart[i].product, quantity: guestCart[i].qty },
          {
            headers: {
              authorization: window.localStorage.getItem("token"),
            },
          }
        );
        dispatch({ type: "SET_CART", cart: response.data });
      }
      localStorage.removeItem('lineItem')
    } else {
      let response = await axios.post("/api/sessions", credentials);
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
    }

    history.push("/");
    toastr.success('Your logged in.', 'Welcome.')
  };
};

export const editUser = (user, history) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/users/${user.id}`, user, {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });
    toastr.success('User Updated', 'The field is updated.')
    dispatch({ type: "SET_AUTH", auth: response.data });
    history.push("/user");
    toastr.success("Information was updated.")
  };
};

export default auth;
