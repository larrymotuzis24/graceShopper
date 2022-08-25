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
  if (action.type === "CREATE_PRODUCT"){
    return [...state, action.newBook]
  }
  return state;
};


export const createProduct = (product) => {
  return async(dispatch) => {
    const response = await axios.post('/products', product)
    const newBook = response.data
    console.log('new book', newBook)
    dispatch({ type: "CREATE_PRODUCT", newBook })
  }
}
export const updateBook = (book) => {
  return async(dispatch) => {
    const response = await axios.put(`/products/${book.id}`, book)
    const newbook = response.data
    dispatch({ type: "UPDATE_PRODUCT", newbook})
  }
}

export const updateBookCoupon = (coupon) => {
  return async(dispatch) => {
      console.log('in store', coupon)
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