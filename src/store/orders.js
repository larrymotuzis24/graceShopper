import axios from "axios";

const orders = (state = [], action) => {
  if (action.type === "SET_ORDERS") {
    state = action.orders;
  }
  return state;
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