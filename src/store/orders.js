import axios from "axios";
import {reducer as toastrReducer} from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'


const orders = (state = [], action) => {
  if (action.type === "SET_ORDERS") {
    state = action.orders;
  }
  if (action.type === "GET_ORDERS"){
    state = action.orders
  }
  return state;
};

export const getTotalOrders = () => {
  return async (dispatch) => {
  const response = await axios.get('/orders')
  const orders = response.data
  dispatch({ type: "GET_ORDERS", orders })
  };
};


export const fetchOrders = (user) => {
    return async (dispatch) => {
      const response = await axios.get(`/api/orders/history/${user.id}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: "SET_ORDERS", orders: response.data });
    };
};

export default orders;