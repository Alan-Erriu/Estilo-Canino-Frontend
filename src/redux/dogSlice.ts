// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from './store';
// import { DogDataState } from '../types/dog';


// const initialState: DogDataState = {
//     name: '',
//     breed: '',
//     age: '',
//     owner: '',
//     dogId: '',

// };


// export const dogSlice = createSlice({
//     name: 'dog',
//     initialState,
//     reducers: {
//         setUserName: (state, action: PayloadAction<string>) => {
//             state.name = action.payload;
//         },
//         setLoginData: (state, action: PayloadAction<DogDataState>) => {
//             state.dogId = action.payload.dogId;

//         },
//         setUserData: (state, action: PayloadAction<DogDataState>) => {
//             state.name = action.payload.name;

//         },
//         setLogoutData: (state) => {
//             state.name = '';
//             state.breed = '';
//             state.age = '';
//             state.owner = '';
//             state.dogId = '';
//         }
//     }

// });

// export const { setUserName, setLoginData, setUserData, setLogoutData } = dogSlice.actions;

// export const getUser = (state: RootState) => state.user;

// export default dogSlice.reducer;