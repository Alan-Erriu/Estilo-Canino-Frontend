export interface DogDataState {
    name?: string
    breed?: string
    age?: string
    owner?: string
    _id?: string

}

export interface EditDogModalProps {
    dog: DogDataState;
    open: boolean;
    onClose: () => void;
}

export interface CardDogProps {
    dog: DogDataState;
}  