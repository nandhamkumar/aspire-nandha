import { createStore, combineReducers } from 'redux';
import profileReducer from '../reducers/profileReducer';
const rootReducer = combineReducers(
    { store: profileReducer}
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;