import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';
import BASE_URL from "./baseUrl";

const doctorApi = createApi({
    reducerPath: 'doctor',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: (doctors) => {
            return fetch(doctors);
        },
        paramsSerializer: queryString.parse
    }),
    endpoints(build) {
        return {
            fetchDoctors: build.query({
                providesTags: (result, error, doctor) => {
                    return [{type: 'Doctor', doctor}];
                },
                query: (specialty) => {
                    return {
                        url: '/doctors',
                        method: 'GET'
                    };
                }
            }),
            addDoctor: build.mutation({
                invalidatesTags: (result, error, doctor) => {
                    return [{type: 'Doctor', doctor}]
                },
                query: (doctor) => {
                    return {
                        url: 'doctors/',
                        method: 'POST',
                        body: {
                            title: doctor.title
                        }
                    }
                }
            }),
        };
    }
});


// const doctorApi = createApi({
//     reducerPath: 'doctor',
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//         fetchFn: async (...args) => {
//             return fetch(...args);
//         }
//     }),
//     endpoints(build) {
//         return {
//             fetchDoctor: build.query(
//                 {
//                     providesTags: (result, error, doctor) => {
//                         return [{type: 'Doctor', doctor}]
//                     },
//                     query: (doctor) => {
//                         return {
//                             url: '/doctor',
//                             method: 'GET'
//                         }
//                     }
//                 }
//             )
//         }
//     }
// });


export const {useFetchDoctorsQuery} = doctorApi;
export {doctorApi};