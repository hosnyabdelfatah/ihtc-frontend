import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BASE_URL from "../app/apis/baseUrl";
import axios from "axios";

export const loginOrganization = createAsyncThunk(
    "organization/loginOrganization",
    async (userCredintial) => {
        const request = await axios.post(
            `${BASE_URL}/organizations/login`,
            userCredintial,
            {
                withCredentials: true,
                withXSRFToken: true,
                headers: {'Content-Type': 'application/json'}
            },
        );

        const response = await request.data.data;
        return response;
    }
);

const organizationSlice = createSlice({
    name: "organization",
    initialState: {
        organizationObj: null,
    },
    reducers: {
        clearOrganization: (state) => {
            state.organizationObj = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginOrganization.pending, (state) => {
            state.organizationObj = null;
        }).addCase(loginOrganization.fulfilled, (state, action) => {
            state.organizationObj = action.payload;
        });
    },
});

export default organizationSlice.reducer;
export const {clearOrganization} = organizationSlice.actions;