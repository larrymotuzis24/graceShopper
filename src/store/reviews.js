import axios from 'axios';

const reviews = (state = [], action)=> {
  if(action.type === 'SET_REVIEWS'){
    state = action.reviews;
  }
  if(action.type === 'CREATE_REVIEW'){
    state = [...state, state.review]
  }
  return state;
};  
  
export const fetchReviews = () => {
    return async(dispatch) => {
       const reviews = (await axios.get('/api/reviews')).data;
       dispatch({type: 'SET_REVIEWS', reviews});
    }
};

export const createReview = (review) =>{
    return async(dispatch) =>{
        review = (await axios.post('/api/reviews', review, {
            headers: {
              authorization: window.localStorage.getItem("token"),
            },
        })).data;
        dispatch({type: 'CREATE_REVIEW', review});
    }
}

export default reviews;