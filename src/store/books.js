import axios from 'axios';

const books = (state = [], action)=> {
  if(action.type === 'SET_BOOKS'){
    state = action.books;
  }
  if (action.type === "DELETE_PRODUCT"){
    return state.filter(book => book.id !== action.num)
  }
  if (action.type === "UPDATE_PRODUCT"){
    return state.map((book) => book.id !== action.newbook.id ? book : action.newbook)
  }
  return state;
};


export const updateBook = (book) => {
  return async(dispatch) => {
    const response = await axios.put(`/products/${book.id}`, book)
    const newbook = response.data
    dispatch({ type: "UPDATE_PRODUCT", newbook})
  }
}

export const deleteProduct = (num) => {
  return async(dispatch) => {
    await axios.delete(`/products/${num}`)
    dispatch({ type: "DELETE_PRODUCT", num })
  }
}

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