const initiaState = {
    contacts: [
        {
            id: 1,
            name: "Jill Johnson",
            email: "dksj@kjs.com",
            phone: "11-11-11",
            type: 'personal'
        },
        {
            id: 2,
            name: "Jill Johnson",
            email: "dksj@kjs.com",
            phone: "11-11-11",
            type: 'professional'
        },
        {
            id: 3,
            name: "Jill Johnson",
            email: "dksj@kjs.com",
            phone: "11-11-11",
            type: 'personal'
        },
    ],
    contact: null,
    filtered: null
}

export default function (state = initiaState, action) {
    switch (action.type) {
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
            }
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
            }
        case 'SET_CONTACT':
            return {
                ...state,
                contact: action.payload,
            }
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            }
        case 'CLEAR_CONTACT':
            return { ...state, contact: null }
        case 'FILTER_CONTACT':
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex)
                })
            }
        case 'CLEAR_FILTER':
            return { ...state, filtered: null }

        default:
            return state
    }

}