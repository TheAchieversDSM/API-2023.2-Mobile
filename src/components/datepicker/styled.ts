import { styled } from "styled-components";
import { Input } from "@rneui/base";

interface IInput {
    color?: string;
}

export const DataPicker = styled(Input).attrs<IInput>((props) => ({
    inputStyle: {
        color: props.color || 'white',
        paddingLeft: 10,
        fontFamily: props.theme.FONTS.Poppins_400Regular,
    },
    placeholderTextColor: props.color || 'white',
}))``