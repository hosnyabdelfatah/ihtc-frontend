import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BASE_URL from "../app/apis/baseUrl";
import axios from "axios";

export const loginDoctor = createAsyncThunk(
    "doctor/loginDoctor",
    async (userCredintial) => {
        const request = await axios.post(
            `${BASE_URL}/doctors/login`,
            userCredintial,
            {
                withCredentials: true,
                headers: {'Content-Type': 'application/json'}
            },
        );

        const response = await request.data.doctor;
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