// This is the redux store to manage the profile data
import { STORE } from '../constants';

export function updateStore(data : any) {
    return {
        type: STORE,
        payload: data
    }
}