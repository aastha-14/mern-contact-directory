import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from "./alert";

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({ type: 'USER_LOADED', payload: res.data.user })
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR' })
    }
}
// Register user
export const registerUser = (data) => async (dispatch) => {
    try {
        const res = await axios.post('/api/users', data)
        dispatch({ type: 'REGISTER_SUCCESS', payload: res.data })
        loadUser()
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({ type: 'REGISTER_FAILED' })
    }

}

// Login User
export const userLogin = (data) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth', data)
        dispatch({ type: 'USER_LOGIN', payload: res.data })
        loadUser()
    } catch (error) {
        const cred = error.response.data;
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        if (cred) {
            dispatch(setAlert(cred.msg, 'danger'))
        }
        dispatch({ type: 'LOGIN_FAILED' })
    }
}

// Logout
export const logout = (history) => (dispatch) => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
}

// // Clear errors
// export const clearError = () => dispatch => {
//     dispatch({ type: 'CLEAR_ERROR' })
// }