export interface GroomerDataState {
    id: string;
    name: string;
    email: string;
    age: number;
    role: string

}

export interface UserTypeGroomerState {
    groomers: GroomerDataState[];
}