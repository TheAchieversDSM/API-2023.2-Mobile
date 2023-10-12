import { GestureResponderEvent } from "react-native";

export interface ICheckbox{
    label: string
    check: boolean
    cross?: boolean
    backgroundColor?: string
    color?: string
    onLongPress?: () => void;
    onCheck: (event: GestureResponderEvent) => void;
}