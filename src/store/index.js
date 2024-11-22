import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {setupListeners} from "@reduxjs/toolkit/query";
import {changeUserState} from "../features/userAsSlice";
import userStateSlice from '../features/userAsSlice';
import {statusApi} from "../app/apis/statusApi";
import {apiSlice} from "../app/apiSlice";
import doctorSlice from "../features/doctorSlice";
import userSlice from "../features/userSlice";
import authReducer from "../features/auth/authSlice";
import currentUserReducer, {setCurrentUser} from '../features/currentUserSlice';
import currentOrganizationsListReducer, {setOrganizationsList} from '../features/organizatiosListSlice';
import {authOrganizationApi} from '../features/auth/authOrganizationApi';
import {organizationsApi} from '../app/apis/organozationApi';
import {languageApi} from "../app/apis/languageApi";
import {doctorApi} from "../app/apis/doctorApi";
import {doctorSpecialtyApi} from "../app/apis/doctorSpecialtyApi";
import {countryApi} from "../app/apis/countryApi";

const rootReducer = combineReducers({
    doctor: doctorSlice,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
        userState: userStateSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        currentUser: currentUserReducer,
        currentOrganizationsList: currentOrganizationsListReducer,
        [statusApi.reducerPath]: statusApi.reducer,
        [authOrganizationApi.reducerPath]: authOrganizationApi.reducer,
        [organizationsApi.reducerPath]: organizationsApi.reducer,
        [languageApi.reducerPath]: languageApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        [doctorSpecialtyApi.reducerPath]: doctorSpecialtyApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat([
                statusApi.middleware,
                authOrganizationApi.middleware,
                organizationsApi.middleware,
                languageApi.middleware,
                doctorApi.middleware,
                doctorSpecialtyApi.middleware,
                countryApi.middleware
            ]);
    },
    devTools: true
});

setupListeners(store.dispatch);

export {changeUserState}
export {setCurrentUser}
export {setOrganizationsList}
export {useFetchUserUseStatusQuery, useAddUserStatusMutation} from '../app/apis/statusApi';
export {useOrganizationLoginMutation} from '../features/auth/authOrganizationApi';
export {useFetchOrganizationsQuery,} from '../app/apis/organozationApi';
export {useFetchLanguagesQuery} from '../app/apis/languageApi';
export {useFetchDoctorsQuery} from '../app/apis/doctorApi';
export {useFetchDoctorSpecialtiesQuery, useAddDoctorSpecialtyMutation} from '../app/apis/doctorSpecialtyApi';
export {useFetchCountriesQuery} from '../app/apis/countryApi';

