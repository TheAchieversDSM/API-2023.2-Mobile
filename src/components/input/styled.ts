import { Input } from "@rneui/base";
import { styled } from "styled-components/native";

interface IInput {
    color?: string;
}

export const InputC = styled(Input).attrs<IInput>((props) => ({
    inputStyle: {
        color: props.color || 'white',
        paddingLeft: 10,
    },
    inputContainerStyle: {
        marginHorizontal: 30
    },
    placeholderTextColor: props.color || 'white',
}))``