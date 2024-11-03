import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import BASE_URL from "./baseUrl";

const languageApi = createApi({
    reducerPath: 'languages',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (language) => {
            return fetch(language);
        },
        paramsSerializer: ('baseUrl')

    }),
    endpoints(build) {
        return {
            fetchLanguages: build.query({
                providesTags: (result, error, language) => {
                    // console.log(result)
                    return [{type: 'Language', language}];
                },
                query: (language) => {
                    return {
                        url: 'languages/',
                        method: 'GET'
                    }
                }
            })
        }
    }

});

export const {
    useFetchLanguagesQuery
} = languageApi;

export {languageApi};