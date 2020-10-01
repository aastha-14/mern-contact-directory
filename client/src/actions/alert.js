import { v4 } from 'uuid'

export const setAlert = (msg, type) => (dispatch) => {
    const id = v4()
    dispatch({ type: 'SET_ALERT', payload: { id, msg, type } })
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), 3000)
}