const intialState = {
    token: localStorage.getItem('jwt'),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function (state = intialState, action) {
    switch (action.type) {
        case 'USER_LOGIN':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('jwt', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'REGISTER_FAILED':
        case 'LOGIN_FAILED':
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('jwt');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    };
}