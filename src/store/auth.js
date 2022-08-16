import axios from 'axios';
const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    state = action.auth;
  }
  return state;
};

export const logout = ()=> {
  return (dispatch)=> {
    window.localStorage.removeItem('token');
    dispatch({ type: 'SET_AUTH', auth: {}});

  };
};

export const exchangeToken = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/sessions', {
        headers: {
          authorization: token
        }
      });
      const auth = response.data;
      dispatch({ auth, type: 'SET_AUTH'});
    }
  };
};

export const login = (credentials)=> {
  return async(dispatch)=> {
    let response = await axios.post('/api/sessions', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token); 
    response = await axios.get('/api/sessions', {
      headers: {
        authorization: token
      }
    });
    const auth = response.data;
    dispatch({ auth, type: 'SET_AUTH'});

  };
};

export const editUser = (user, history) =>{
  return async (dispatch) => {
      const response = await axios.put(`/api/users/${user.id}`, user,{
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
      history.push('/user');
      alert('Information was updated.')
    };
}

export default auth;
