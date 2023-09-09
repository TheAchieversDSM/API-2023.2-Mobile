import FontAwesome from '@expo/vector-icons/FontAwesome';

export interface IInput {
    placeholder: string;
    width?: number;
    color?: string;
    value?: string;
    iconR?: keyof typeof FontAwesome.glyphMap;
    iconL?: keyof typeof FontAwesome.glyphMap;
    errorMsg?: string;
    password?: boolean;
    textColor?: "#fff" | "#000";
    onChange: (e: string) => void;
}