export interface AppointmentAvailable {
    appointmentAvailable: any
    date?: string
    month?: string
    year?: string
    day?: string
    groomerId?: string
}

export interface NewAppointment {

    date?: string
    month?: string
    year?: string
    day?: string
    time?: string
    groomer?: string
    dog?: string
    client?: string

}
export interface AppointmentState {

    appointmentAvailable: string[];
    newAppointment: string[];
}