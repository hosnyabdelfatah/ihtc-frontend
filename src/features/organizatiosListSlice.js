import {createSlice} from "@reduxjs/toolkit";

const organizationsListSlice = createSlice({
    name: 'organizationsList',
    initialState: {currentOrganizationsList: null},
    reducers: {
        setOrganizationsList: (state, action) => {
            state.currentOrganizationsList = action.payload
        }
    }
});

export const {setOrganizationsList} = organizationsListSlice.actions;

export default organizationsListSlice.reducer;

export const getCurrenOrganizationsList = state => state.currentOrganizationsList;