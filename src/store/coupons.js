import axios from 'axios';
// import {reducer as toastrReducer} from 'react-redux-toastr'
// import {toastr} from 'react-redux-toastr'

const coupons = (state = [], action)=> {
    if(action.type === 'SET_COUPONS'){
      state = action.coupons;
    }
    if (action.type === "CREATE_COUPON"){
        state = [...state, action.coupon]
    }
    return state;
};

export const fetchCoupons = () => {
    return async(dispatch) => {
       const coupons = (await axios.get('/api/orders/coupons', {
        headers: {
            authorization: window.localStorage.getItem("token"),
          },
       })).data;
       dispatch({type: 'SET_COUPONS', coupons})
    }
};

export const createCoupon = (coupon) =>{
    return async(dispatch) =>{

        coupon = (await axios.post('/api/orders/coupons', coupon, {

            headers: {
                authorization: window.localStorage.getItem("token")
            },
        })).data;
        dispatch({type: 'CREATE_COUPON', coupon})
        // toastr.success('Coupon created.')
    }
}

export default coupons;