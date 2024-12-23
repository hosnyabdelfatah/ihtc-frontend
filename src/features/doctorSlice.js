import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BASE_URL from "../app/apis/baseUrl";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const loginDoctor = createAsyncThunk(
    "doctor/loginDoctor",
    async (userCredintial) => {
        const request = await axios.post(
            `${BASE_URL}/doctors/login`,
            userCredintial,
            {
                withCredentials: true,
                withXSRFToken: true,
                headers: {'Content-Type': 'application/json'}
            },
        );
        console.log(request)
        const response = await request.data.data;
        console.log(response)


        return response;
    }
);

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctorObj: null,
    },
    reducers: {
        clearDoctor: (state) => {
            state.doctorObj = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginDoctor.pending, (state) => {
            state.doctorObj = null;
        }).addCase(loginDoctor.fulfilled, (state, action) => {
            state.doctorObj = action.payload;
        });
    },
});

export default doctorSlice.reducer;
export const {clearDoctor} = doctorSlice.actions;