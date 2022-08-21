import axios from 'axios';

const states = (state = [], action)=> {
    if(action.type === 'SET_STATES'){
      state = action.states;
    }
    return state;
};

export const fetchStates = () => {
    return async(dispactch) => {
       const states = (await axios.get('/api/states')).data;
       dispactch({type: 'SET_STATES', states})
    }
};

export default states;