import axios from 'axios';

const view = (state= window.location.hash.slice(1), action) => {
        if(action.type === 'SET_VIEW'){
            return action.view
        }
        return state
};

export default view