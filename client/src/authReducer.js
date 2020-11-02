import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    LOAD_USER,
    AUTH_ERROR,
    LOG_OUT
} from './constants/constants.js'

const intialState = {
    token: localStorage.getItem('token'),
    isLoggedIn : false,
    errors: {}
}

const authReducer = (state = intialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                isLoggedIn: true
            }
        case LOAD_USER:
            localStorage.getItem('token');
            return {
                ...state,
                isLoggedIn: true
            }
        case LOGIN_FAILED:
        case REGISTER_FAILED:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                isLoggedIn: false,
                errors: payload
            }
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isLoggedIn: false,
            }
        default:
            return state
    }

}
export default authReducer;