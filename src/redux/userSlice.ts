import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { UserDataState } from '../types/userData';


const initialState: UserDataState = {
    name: '',
    email: '',
    age: '',
    userId: '',
    authToken: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setLoginData: (state, action: PayloadAction<UserDataState>) => {
            state.userId = action.payload.userId;
            state.authToken = action.payload.authToken;
        },
        setUserData: (state, action: PayloadAction<UserDataState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        setLogoutData: (state) => {
            state.name = '';
            state.email = '';
            state.userId = '';
            state.authToken = '';
        }
    }
});

export const { setUserName, setLoginData, setUserData, setLogoutData } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;