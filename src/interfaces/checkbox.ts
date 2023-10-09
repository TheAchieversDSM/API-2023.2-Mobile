import { GestureResponderEvent } from "react-native";

export interface ICheckbox{
    label: string
    check: boolean
    onLongPress?: () => void;
    onCheck: (event: GestureResponderEvent) => void;
}