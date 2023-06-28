export interface ClientDataState {
    _id: string;
    name: string;
    email: string;
    age: number;
    role: string

}

export interface UserTypeClientState {
    client: ClientDataState[];
}