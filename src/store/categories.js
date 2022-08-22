import axios from 'axios';

const categories = (state = [], action)=> {
    if(action.type === 'SET_CATEGORIES'){
      state = action.categories;
    }
    return state;
};

export const fetchCategories = () => {
    return async(dispatch) => {
       const categories = (await axios.get('/api/categories')).data;
       dispatch({type: 'SET_CATEGORIES', categories})
    }
};

export default categories;