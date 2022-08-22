import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const users = (state = [], action)=> {
    if(action.type === 'GET_USERS'){
      state = action.users;
    }
    if (action.type === "UPDATE_USER") {
        return state.map((user) => user.id !== action.updated.id ? user : action.updated)
    }
    if (action.type === "DELETE_USER"){
      return state.filter(user => user.id !== action.num)
    }
    return state;
};

export const updateUserRole = (user) => {
    return async(dispatch) => {
        const response = await axios.put(`/users/update/${user}`, { isAdmin: true }, {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        }) 
        const updated = response.data
        dispatch({ type: "UPDATE_USER", updated })
    }
}

export const deleteUser = (num) => {
  return async(dispatch) =>{
   await axios.delete(`/users/${num}`)
   dispatch({ type: "DELETE_USER", num })
  }
}
export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/users', {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    })
    const users = response.data
    dispatch({ type: 'GET_USERS', users })
  }
}

export default users;