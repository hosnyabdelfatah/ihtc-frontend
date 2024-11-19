import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null, error: null},
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
        },
        setError: (state, action) => {
            const {error} = action.payload;
            state.error = error;
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
})

export const {setCredentials, setError, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentError = (state) => state.error