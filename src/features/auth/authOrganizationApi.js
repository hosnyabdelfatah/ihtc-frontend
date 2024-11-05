import {apiSlice} from "../../app/apiSlice";

export const authOrganizationApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        organizationLogin: builder.mutation({
            query: credentials => ({
                url: '/organizations/login',
                method: 'POST',
                body: {...credentials},
                credentials: 'include',
            })
        }),
    })
})


export const {useOrganizationLoginMutation} = authOrganizationApi;
