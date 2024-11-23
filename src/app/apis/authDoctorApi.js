import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials, setError, logOut} from "../../features/auth/authSlice";
import BASE_URL from "./baseUrl";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error) {
        setError(result?.error)
    }

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        //send refresh token to get new access token
        const refreshResult = await baseQuery('doctor/refresh', api, extraOptions)
        console.log(refreshResult?.data)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            //store the new token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            //    retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }

    } else {
        api.dispatch(logOut())
    }
    return result
}

export const authDoctorApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        doctorLogin: builder.mutation({
            query: credentials => ({
                url: 'doctors/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
    })
})


export const {useDoctorLoginMutation} = authDoctorApi;
export default authDoctorApi;