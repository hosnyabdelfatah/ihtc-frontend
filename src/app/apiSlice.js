import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials, setError, logOut} from "../features/auth/authSlice";
import BASE_URL from "./apis/baseUrl";


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: async (headers, {getState}) => {
        const token = await getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        // console.log()
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    const user = api.getState().auth.user
    // console.log(result?.error)


    api.dispatch(setCredentials(result?.data?.organization, result?.data?.token))

    if (result?.error?.originalStatus === 400) {
        api.dispatch(setError(result?.error?.data))
        console.log(result)
    }
    
    if (result?.error?.originalStatus === 403) {
        console.log(`error?.originalStatus: ${result?.error?.originalStatus}`)
        //send refresh token to get new access token
        const refreshResult = await baseQuery('organizations/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            console.log(user)

            //store the new token
            console.log(refreshResult)
            api.dispatch(setCredentials({...refreshResult.data, user}))
            //    retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }
    } else {
        api.dispatch(logOut())
    }

    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})