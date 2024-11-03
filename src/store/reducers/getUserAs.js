import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currentState: undefined,
}

export const getUserAsStatus = createAsyncThunk(
    "/main/use-app-as",
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${req.protocol}://${req.get('host')}/main/use-app-as`)
            console.log(response)

        } catch (e) {
            console.log(e)
        }
    }
)

const userUseAsStatus = createSlice({
    name: "userStatus",
    initialState,
    
})