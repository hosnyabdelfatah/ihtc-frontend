import {createSlice} from "@reduxjs/toolkit";

const userStateSlice = createSlice({
    name: 'userStatus',
    initialState: {userState: 'user'},
    reducers: {
        changeUserState: (state, action) => {
            state.userState = action.payload
        }
    }
});

export const {changeUserState} = userStateSlice.actions;
export default userStateSlice.reducer;

export const selectCurrentUserState = (state) => state.userState
