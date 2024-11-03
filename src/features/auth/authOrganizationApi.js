import {apiSlice} from "../../app/apiSlice";

export const authOrganizationApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        organizationLogin: builder.mutation({
            query: credentials => ({
                url: 'organizations/login',
                method: 'POST',
                body: {...credentials},
                credentials: 'include',
                headers: {'Content-type': 'application/json'},
                withCredentials: true,
                withXSRFToken: true
            })
        }),
    })
})


export const {useOrganizationLoginMutation} = authOrganizationApi;
