export interface LoginFormProps {
    onSubmit: (data: LoginFormValues) => void;
}

export interface LoginFormValues {
    email: string;
    password: string;
}
