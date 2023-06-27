import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import { userTypeGroomerSlice } from './usersTypeGroomerSlice'
import { userTypeClientSlice } from './usersTypeClientSlice'
// import { dogSlice } from './dogSlice'
// import { turnSlice } from './turnSlice'


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        groomer: userTypeGroomerSlice.reducer,
        client: userTypeClientSlice.reducer
        // dog: dogSlice.reducer,
        // turn: turnSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch