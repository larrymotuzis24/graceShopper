import axios from 'axios';

const categories = (state = [], action)=> {
    if(action.type === 'SET_CATEGORIES'){
      state = action.categories;
    }
    return state;
};

export const fetchCategories = () => {
    return async(dispactch) => {
       const categories = (await axios.get('/api/categories')).data;
       dispactch({type: 'SET_CATEGORIES', categories})
    }
};

export default categories;