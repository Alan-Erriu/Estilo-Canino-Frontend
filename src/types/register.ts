export interface RegistrationFormProps {
    onSubmit: (data: RegistrationFormData) => void;
}

export interface RegistrationFormData {
    name: string;
    age: number;
    email: string;
    password: string;
}