const initiaState = {
    contacts: [],
    contact: null,
    filtered: null,
    loading: true
}

export default function (state = initiaState, action) {
    switch (action.type) {
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            }
        case 'GET_CONTACTS':
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                loading: false
            }
        case 'SET_CONTACT':
            return {
                ...state,
                contact: action.payload,
                loading: false
            }
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact),
                loading: false
            }
        case 'CLEAR_CONTACT':
            return {
                ...state,
                contact: null,
                contacts: [],
                loading: false,
                filtered: null
            }
        case 'FILTER_CONTACT':
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex)
                }),
                loading: false
            }
        case 'CLEAR_FILTER':
            return { ...state, filtered: null, loading: false }

        default:
            return state
    }

}