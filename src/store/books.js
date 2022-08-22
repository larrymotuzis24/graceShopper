import axios from 'axios';

const books = (state = [], action)=> {
  if(action.type === 'SET_BOOKS'){
    state = action.books;
  }
  return state;
};


export const _setBooks = (books) => {
  return {
      type:'SET_BOOKS',
      books
  }    
};  
  
export const fetchBooks = () => {
    return async(dispatch) => {
       const books = (await axios.get('/api/books')).data;
       dispatch(_setBooks(books))
    }
};

export default books;