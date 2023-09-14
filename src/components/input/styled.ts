import { Input } from "@rneui/base";
import { styled } from "styled-components/native";

interface IInput {
    color?: string;
}

export const InputC = styled(Input).attrs<IInput>((props) => ({
    inputStyle: {
        color: props.color || 'white',
        paddingLeft: 10,
        fontFamily: 'Poppins_400Regular',
    },
    inputContainerStyle: {
        marginHorizontal: 30,
        /* @REVIEW - Deixar fixo ou deixar alguma props */
        marginBottom: 15,
    },
    placeholderTextColor: props.color || 'white',
}))``