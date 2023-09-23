import AntDesign from '@expo/vector-icons/AntDesign';

export interface IDropdown {
    data: IItem[],
    onChange?: (e: any) => void,
    onChangeText?: (e: string) => void,
    search?: boolean,
    value?: string,
    fontSize?: number,
    placeholder: string,
    searchPlaceholder?: string,
    disabled?: boolean,
    iconName?: keyof typeof AntDesign.glyphMap,
    iconSelectedName?: keyof typeof AntDesign.glyphMap,
    iconSize?: number,
    iconColor?: string,
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
    width?: number,
    onValueChange: (value: string) => void;
}

export interface IItem {
    label: string,
    value: string,
}