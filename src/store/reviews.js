import axios from 'axios';

const reviews = (state = [], action)=> {
  if(action.type === 'SET_REVIEWS'){
    state = action.reviews;
  }
  if(action.type === 'CREATE_REVIEW'){
    state = [...state, action.review]
  }
  return state;
};  
  
export const fetchReviews = () => {
    return async(dispatch) => {
       const reviews = (await axios.get('/api/reviews')).data;
       dispatch({type: 'SET_REVIEWS', reviews});
    }
};
export const createRating = (rating) => {
  return async(dispatch) => {
    const response = await axios.post('/api/reviews', rating)
    let review = response.data
    review = {
      ...review, rating: review.rating * 1
    }
    console.log('review', review)
    dispatch({type: 'CREATE_REVIEW', review});
  }
}

// export const createRating = (review) =>{
//     return async(dispatch) =>{
//         review = (await axios.post('/api/reviews', review, {
//             headers: {
//               authorization: window.localStorage.getItem("token"),
//             },
//         })).data;
//         dispatch({type: 'CREATE_REVIEW', review});
//     }
// }

export default reviews;