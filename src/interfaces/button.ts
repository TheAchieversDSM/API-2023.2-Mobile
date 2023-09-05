export interface IButton {
    title: string;
    width?: number;
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
    type?: "solid" | "outline" | "clear";
    onPress: () => void;
}