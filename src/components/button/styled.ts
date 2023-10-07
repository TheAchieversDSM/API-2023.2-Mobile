import { styled } from "styled-components";
import { Button } from "@rneui/base";

interface IButton {
    width?: number;
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
    fontSize?: number;
    marginTop?: number;
    marginBottom?: number;
}

export const Btn = styled(Button).attrs<IButton>((props) => ({
    buttonStyle: {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderWidth: 1,
        borderRadius: 30,
        width: props.width || 170,
        marginTop: props.marginTop || 15,
        marginBottom: props.marginBottom || 15,
    },
    titleStyle: {
        color: props.color || 'white',
        fontFamily: props.theme.FONTS.Poppins_400Regular,
        fontSize: props.fontSize || 16,
    }
}))``