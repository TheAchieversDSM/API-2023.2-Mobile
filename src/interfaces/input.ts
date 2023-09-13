import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export interface IInput{
    placeholder: string;
    width?: number;
    color?: string;
    value?: string;
    iconR?: keyof typeof FontAwesome.glyphMap;
    iconL?: keyof typeof FontAwesome.glyphMap;
    errorMsg?: string;
    password?: boolean;
    textColor?: "#fff" | "#000";
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;   
}