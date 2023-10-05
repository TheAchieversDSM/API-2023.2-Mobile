import {SafeAreaView, View, Text} from "react-native";
import {styled} from "styled-components/native";

export const Titulo = styled(Text)`
  font-size: 20px;
  font-family: ${( props ) => props.theme.FONTS.Poppins_600SemiBold};
  color: #ffff;
  text-align: center;
`;
