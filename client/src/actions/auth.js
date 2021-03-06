import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from "./alert";

// Load user
export const loadUser = () => async (dispatch) => {
    setAuthToken(localStorage.jwt);
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: 'USER_LOADED',
            payload: res.data.user
        });
    } catch (err) {
        dispatch({ type: 'AUTH_ERROR' });
    }
};

// Register user
export const registerUser = (data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/users', data, config);
        dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        loadUser();
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({ type: 'REGISTER_FAILED' });
    }

};

// Login User
export const userLogin = (data) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/auth', data, config);
        dispatch({ type: 'USER_LOGIN', payload: res.data });
        loadUser();
    } catch (error) {
        const cred = error.response.data;
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        if (cred) {
            dispatch(setAlert(cred.msg, 'danger'));
        }
        dispatch({ type: 'LOGIN_FAILED' });
    }
};

// Logout
export const logout = (history) => async (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
};
