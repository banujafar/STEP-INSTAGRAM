const initialState = {
    users: [],
    loading: false,
    error: false

}
export const userListReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_USERS':
            return { 
                ...state,
                loading: false,
                users: action.payload
            };

        case 'LOADING_USERS':
            return {
                ...state,
                loading: true
            }

        case 'ERROR_USERS':
            return {
                ...state,
                loading: false,
                error: true
            }

        default:
            return state;
    }
}