import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: window['localStorage'].getItem('access-token') || null,
    username: window['localStorage'].getItem('username') || null,
    userData: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, username } = action.payload
            state.token = token
            state.username = username
            window['localStorage'].setItem('access-token', token)
            window['localStorage'].setItem('username', username)
        },
        logOut: state => {
            state.token = null
            state.username = null
            window['localStorage'].removeItem('access-token')
            window['localStorage'].removeItem('username')
        },
        setCurrentUser: (state, action) => {
            state.userData = action.payload
        }
    },

})

export default authSlice.reducer
export const { setCredentials, logOut, setCurrentUser } = authSlice.actions

export const selectCurrentToken = (state) => state.auth.token