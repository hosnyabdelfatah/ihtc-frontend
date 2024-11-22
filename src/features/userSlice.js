import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BASE_URL from "../app/apis/baseUrl";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userCredintial) => {
        const request = await axios.post(
            `${BASE_URL}/users/login`,
            userCredintial
        );

        const response = await request.data.user;
        return response;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userObj: null,
    },
    reducers: {
        clearUser: (state) => {
            state.userObj = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.userObj = null;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.userObj = action.payload;
        });
    },
});

export default userSlice.reducer;
export const {clearUser} = userSlice.actions;