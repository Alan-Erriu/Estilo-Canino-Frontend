import { DogDataState } from "./dog";

export interface UserDataState {
    name?: string;
    age?: string
    email?: string;
    role?: string
    userId: string;
    authToken?: string;
    dogs?: DogDataState[];
}