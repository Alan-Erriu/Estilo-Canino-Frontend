import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { UserDataState } from '../types/user';
import { DogDataState } from '../types/dog';

interface UserState extends UserDataState {
    dogs: DogDataState[];
}

const initialState: UserState = {
    name: '',
    email: '',
    age: '',
    userId: '',
    authToken: '',
    role: '',
    dogs: []
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
            state.age = action.payload.age;
            state.userId = action.payload.userId;
            state.authToken = action.payload.authToken;
            state.role = action.payload.role;
            state.dogs = action.payload.dogs
        },
        setLogoutData: (state) => {
            state.name = '';
            state.email = '';
            state.userId = '';
            state.authToken = '';
            state.dogs = [];
        },



    }
});

export const {
    setUserName,
    setLoginData,
    setUserData,
    setLogoutData,
} = userSlice.actions;

export const getUserData = (state: RootState) => state.user;
export const getDogs = (state: RootState) => state.user.dogs;

export default userSlice.reducer;