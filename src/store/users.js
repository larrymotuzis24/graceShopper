import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import {reducer as toastrReducer} from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'


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
    if (action.type === "CREATE_USER"){
      [...state, action.newUser]
    }
    return state;
};


export const createUser = (user) => {
  return async(dispatch) => {
    const response = await axios.post('/createUser', user)
    const newUser = response.data
    dispatch({ type: "CREATE_USER", newUser})
  }
}
export const updateUser = (user) => {
    return async(dispatch) => {
        const response = await axios.put(`/users/update/${user.id}`, user)
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