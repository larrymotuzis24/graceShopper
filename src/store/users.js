import axios from 'axios';

const users = (state = [], action)=> {
    if(action.type === 'GET_USERS'){
      state = action.users;
    }
    if (action.type === "UPDATE_USER") {
        return state.map((user) => user.id !== action.updated.id ? user : action.updated)
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