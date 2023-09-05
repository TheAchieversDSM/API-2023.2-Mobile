export interface IInput {
    placeholder: string;
    width?: number;
    color?: string;
    value?: string;
    iconR?: string;
    iconL?: string;
    errorMsg?: string;
    password?: boolean;
    onChange: (e: string) => void;
}