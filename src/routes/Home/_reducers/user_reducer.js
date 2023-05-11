import {
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER,
} from '../_actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        
        default:
            return state;
    }
}