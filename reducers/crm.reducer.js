import {
    SLIDE_STATUS,
} from '../actions/actionTypes';

const initialState = {
    crmSlideStatus: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initialState, action) => {
    switch(action.type) {
        case SLIDE_STATUS:
            return {
                ...state,
                crmSlideStatus: action.payload 
            }
        default: 
            return state;
    }
}