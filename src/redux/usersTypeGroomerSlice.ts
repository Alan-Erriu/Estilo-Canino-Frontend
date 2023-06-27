import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { GroomerDataState, UserTypeGroomerState } from '../types/groomer';

const initialState: UserTypeGroomerState = {
    groomers: [],
};

export const userTypeGroomerSlice = createSlice({
    name: 'userTypeGroomer',
    initialState,
    reducers: {
        setGroomerData: (state, action: PayloadAction<GroomerDataState[]>) => {
            state.groomers = action.payload;
        },
    },
});

export const { setGroomerData } = userTypeGroomerSlice.actions;

export const getGroomerData = (state: RootState) => state.groomer;

export default userTypeGroomerSlice.reducer;

