import FontAwesome from '@expo/vector-icons/FontAwesome';
import { InputProps } from '@rneui/base';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export interface IInput extends InputProps {
    placeholder: string;
    marginTop?: number;
    marginBottom?: number;
    width?: number;
    color?: string;
    value?: string;
    iconR?: keyof typeof FontAwesome.glyphMap;
    iconL?: keyof typeof FontAwesome.glyphMap;
    errorMsg?: string;
    password?: boolean;
    textColor?: "#fff" | "#000";
    numberLines?: number;
    multiline?: boolean;
    height?: number;
    fontSize?: number;
    iconRightSize?: number;
    iconLeftSize?: number;
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;   
}