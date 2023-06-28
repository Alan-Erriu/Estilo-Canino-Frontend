import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';


const initialState = {
    currentAppointment: {
        date: "",
        month: "",
        year: "",
        day: "",
        time: "",
        groomer: "",
        dog: "",
        client: ""
    },
    savedAppointments: [],
    availableSlots: [],
};

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        setDateData: (state, action: PayloadAction<{ date: string, month: string, year: string, day: string }>) => {
            const { date, month, year, day } = action.payload;
            state.currentAppointment.date = date;
            state.currentAppointment.month = month;
            state.currentAppointment.year = year;
            state.currentAppointment.day = day;
        },
        setTime: (state, action: PayloadAction<string>) => {
            state.currentAppointment.time = action.payload;
        },
        setGroomer: (state, action: PayloadAction<string>) => {
            state.currentAppointment.groomer = action.payload;
        },
        setDog: (state, action: PayloadAction<string>) => {
            state.currentAppointment.dog = action.payload;
        },
        setClientId: (state, action: PayloadAction<string>) => {
            state.currentAppointment.client = action.payload;
        },
        setSavedAppointments: (state, action: PayloadAction<string[]>) => {
            state.savedAppointments = action.payload;
        },
        setAvailableSlots: (state, action: PayloadAction<string[]>) => {
            state.availableSlots = action.payload;
        }, setLogoutAppointment: (state) => {
            state.currentAppointment = {
                date: "",
                month: "",
                year: "",
                day: "",
                time: "",
                groomer: "",
                dog: "",
                client: ""
            };
            state.savedAppointments = [];
            state.availableSlots = [];
        },
    },
});

export const {
    setDateData,
    setTime,
    setGroomer,
    setDog,
    setClientId,
    setSavedAppointments,
    setAvailableSlots, setLogoutAppointment
} = appointmentSlice.actions;

export const getCurrentAppointment = (state: RootState) =>
    state.appointment.currentAppointment;

export const getSavedAppointments = (state: RootState) =>
    state.appointment.savedAppointments;

export const getAvailableSlots = (state: RootState) =>
    state.appointment.availableSlots;

export default appointmentSlice.reducer;
