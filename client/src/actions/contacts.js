import axios from 'axios';
import { setAlert } from "./alert";

export const addContact = (contact) => async (dispatch) => {
    try {
        const res = await axios.post('/api/contacts', contact);
        dispatch({ type: 'ADD_CONTACT', payload: res.data.contact });
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};

export const getContacts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/contacts');
        dispatch({ type: 'GET_CONTACTS', payload: res.data.contacts });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const deleteContact = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/contacts/${id}`);
        dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
        console.error(error);
    }
};

export const setCurrentContact = (contact) => async (dispatch) => {
    dispatch({ type: 'SET_CONTACT', payload: contact });
};

export const clearCurrentContact = () => (dispatch) => {
    dispatch({ type: 'CLEAR_CURRENT_CONTACT' });
};
export const clearContact = () => async (dispatch) => {
    dispatch({ type: 'CLEAR_CONTACTS' });
};

export const updateContact = (contact) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
        dispatch({ type: 'UPDATE_CONTACT', payload: res.data.contact });
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};

export const filterContact = (text) => async (dispatch) => {
    dispatch({ type: 'FILTER_CONTACT', payload: text });
};

export const clearFilter = () => (dispatch) => {
    dispatch({ type: 'CLEAR_FILTER' });
};
