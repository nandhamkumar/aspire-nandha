// Nandha - Reducer for the Redux store

import { STORE } from '../constants';
const initialState = {
    profile_data: { Name: 'Loading...', card_cvv: '...', card_expiry: '-' }
};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE:
            return {
                ...state,
                profile_data: action.payload
            };
        default:
            return state;
    }
}
export default profileReducer;