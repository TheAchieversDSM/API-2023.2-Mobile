export interface IButton {
    title: string;
    width?: number;
    fontSize?: number;
    backgroundColor?: string;
    borderColor?: string;
    marginTop?: number;
    marginBottom?: number;
    color?: string;
    type?: "solid" | "outline" | "clear";
    onPress: () => void;
}