import { Input } from "@rneui/base";
import { styled } from "styled-components/native";

interface IInput {
    color?: string;
    marginBottom?: number;
    multiline?: boolean;
    numberLines?: number;
    height?: number;
}

export const InputC = styled(Input).attrs<IInput>((props) => ({
    inputStyle: {
        color: props.color || 'white',
        paddingLeft: 10,
        fontFamily: 'Poppins_400Regular',
        overflow: "scroll",
        height: props.height || 50,
    },
    inputContainerStyle: {
        marginHorizontal: 30,
        marginBottom: props.marginBottom || 15,
    },
    placeholderTextColor: props.color || 'white',
    multiline: false || props.multiline,
    numberOfLines: 1 || props.numberOfLines,
}))``