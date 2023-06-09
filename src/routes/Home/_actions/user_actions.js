import axios from 'axios';
import {
    LOGIN_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
// import { USER_SERVER } from '../components/Config.js'; // in config.js  = export const USER_SERVER = '/api/users';
const USER_SERVER = '/phones/users';

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}





