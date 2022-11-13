export function UserReducer(state, action) {
    switch (action.type) {
        case 'login': {
            return {
                ...state,
                loggedUser: action.payload,
                isLoggedIn: true
            }
        }
        case 'logout': {
            return {
                ...state,
                loggedUser: null,
                isLoggedIn: false
            }
        }
        default:
            throw Error('Unknown action: ' + action.type)

    }
}

export const userActions = {
    login: 'login',
    logout: 'logout'
}

export const initialUserState = {
    loggedUser: null,
    isLoggedIn: false,
    isLoading: true
}