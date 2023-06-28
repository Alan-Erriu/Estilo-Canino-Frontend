import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
    ownerId: '',
    dogs: [],
};

export const dogSlice = createSlice({
    name: 'dog',
    initialState,
    reducers: {
        setOwnerID: (state, action) => {
            state.ownerId = action.payload;
        },
        setDogs: (state, action) => {
            state.dogs = action.payload;
        },
    },
});


export const getOwnerId = (state: RootState) => state.dog.ownerId;
export const getDogsByOwnerId = (state: RootState) => state.dog.dogs;
export const { setDogs, setOwnerID } = dogSlice.actions;

export default dogSlice;
