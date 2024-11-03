import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import BASE_URL from "./baseUrl";

const countryApi = createApi({
    reducerPath: 'countries',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            return fetch(...args);
        }
    }),
    endpoints(build) {
        return {
            fetchCountries: build.query({
                providesTgs: (result, error, country) => {
                    return [{type: 'Country', country}];
                },
                query: (countries) => {
                    return {
                        url: 'countries/',
                        method: 'GET'
                    };
                },
            }),
        };
    },

});

export const {useFetchCountriesQuery} = countryApi;
export {countryApi} ;