export interface GroomerDataState {
    _id: string;
    name: string;
    email: string;
    age: number;
    role: string

}

export interface UserTypeGroomerState {
    groomers: GroomerDataState[];
}