export const loadingUsers = () => {
    return {
        type: 'LOADING_USERS'
    }
}

export const errorUsers = () => {
    return {
        type: 'ERROR_USERS',
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: 'LOADING_USERS'
        })

        try {
            const res = await fetch('/users.json')
            const data = await res.json()
            setTimeout(() => {
                dispatch({
                    type: 'GET_USERS',
                    payload: data
                })
            }, 1000)
            
        } catch {
            dispatch({
                type: 'ERROR_USERS'
            })
        }
    }
}