import { Button } from "@rneui/base";
import { styled } from "styled-components/native";

interface IButton {
    width?: number;
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
}

export const Btn = styled(Button).attrs<IButton>((props) => ({
    buttonStyle: {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderWidth: 1,
        borderRadius: 30,
        width: props.width || 170,
    },
    titleStyle: {
        color: props.color || 'white',
        fontFamily: 'Poppins_400Regular'
    }
}))``