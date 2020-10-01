import { v4 } from 'uuid'

export const addContact = (contact) => (dispatch) => {
    contact.id = v4()
    dispatch({ type: 'ADD_CONTACT', payload: contact })
}

export const deleteContact = (id) => dispatch => {
    dispatch({ type: 'DELETE_CONTACT', payload: id })
}

export const setCurrentContact = (contact) => dispatch => {
    dispatch({ type: 'SET_CONTACT', payload: contact })
}

export const clearContact = () => dispatch => {
    dispatch({ type: 'CLEAR_CONTACT' })
}

export const updateContact = (contact) => (dispatch) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: contact })
}

export const filterContact = (text) => (dispatch) => {
    dispatch({ type: 'FILTER_CONTACT', payload: text })
}

export const clearFilter = () => (dispatch) => {
    dispatch({ type: 'CLEAR_FILTER'})
}
