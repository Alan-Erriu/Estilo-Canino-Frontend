import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
// import { dogSlice } from './dogSlice'
// import { turnSlice } from './turnSlice'


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        // dog: dogSlice.reducer,
        // turn: turnSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch