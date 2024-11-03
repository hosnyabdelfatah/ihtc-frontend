import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import BASE_URL from "./baseUrl";

const doctorSpecialtyApi = createApi({
    reducerPath: 'doctorSpecialty',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            return fetch(...args);
        }
    }),
    endpoints(build) {
        return {
            fetchDoctorSpecialties: build.query({
                providesTags: (result, error, specialty) => {
                    return [{type: 'Specialty', specialty}];
                },
                query: (specialty) => {
                    return {
                        url: '/specialties',
                        method: 'GET'
                    };
                }
            }),
            addDoctorSpecialty: build.mutation({
                invalidatesTags: (result, error, specialty) => {
                    return [{type: 'Specialty', specialty}]
                },
                query: (specialty) => {
                    return {
                        url: 'specialties/',
                        method: 'POST',
                        body: {
                            title: specialty.title
                        }
                    }
                }
            }),
        };
    }
});

export const {
    useFetchDoctorSpecialtiesQuery,
    useAddDoctorSpecialtyMutation
}
    = doctorSpecialtyApi;
export {doctorSpecialtyApi};