import { SET_CONTENT_FEED_DATA } from "../actions/actionTypes";

export const setContentFeedData = (data) => ({
    type: SET_CONTENT_FEED_DATA,
    data
})
const initialState = {
    content_feed_data: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTENT_FEED_DATA:
            return { ...state, content_feed_data: action.payload }
        default:
            return state;
    }

}