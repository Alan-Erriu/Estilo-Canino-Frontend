import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ClientDataState, UserTypeClientState } from '../types/cliente';

const initialState: UserTypeClientState = {
    client: [],
};

export const userTypeClientSlice = createSlice({
    name: 'userTypeClient',
    initialState,
    reducers: {
        setClientData: (state, action: PayloadAction<ClientDataState[]>) => {
            state.client = action.payload;
        },
    },
});

export const { setClientData } = userTypeClientSlice.actions;

export const getClientData = (state: RootState) => state.client;

export default userTypeClientSlice.reducer;