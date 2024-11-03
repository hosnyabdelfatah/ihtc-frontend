import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {useSelector, useDispatch} from "react-redux";
import {setOrganizationsList} from "../../features/organizatiosListSlice";
import BASE_URL from "./baseUrl";

const organizationsApi = createApi({
    reducerPath: 'organizations',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (doctor) => {
            return fetch(doctor);
        }
    }),
    endpoints(build) {

        return {
            fetchOrganizations: build.query({
                providesTags: (result, error, organization) => {
                    return [{type: 'Organization', organization}];

                },
                query: (organization) => {

                    return {
                        url: 'organizations/',
                        method: 'GET'
                    };
                },
            }),

        };
    }
});

export const {
    useFetchOrganizationsQuery
} = organizationsApi;
export {organizationsApi};