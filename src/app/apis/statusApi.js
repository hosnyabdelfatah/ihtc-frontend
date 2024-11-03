import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import BASE_URL from "./baseUrl";

const statusApi = createApi({
    reducerPath: 'status',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: (status) => {
            return fetch(status)
        }
    }),
    endpoints(build) {
        return {
            fetchUserUseStatus: build.query(
                {
                    query() {
                        return {
                            url: '/main/use-app-as',
                            method: 'GET',
                        }
                    }
                }
            ),
            addUserUseStatus: build.query({
                query(arg) {
                    return {
                        url: '/main/use-app-as',
                        method: 'POST',
                        body: {
                            userUseAs: arg
                        }
                    }
                }
            }),
        }
    }
});

export const {
    useFetchUserUseStatusQuery,
    useAddUserStatusMutation
} = statusApi;

export {statusApi};