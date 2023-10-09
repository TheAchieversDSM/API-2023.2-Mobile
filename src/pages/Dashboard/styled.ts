import {SafeAreaView, View, Text} from "react-native";
import {styled} from "styled-components";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #222328;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Expirado = styled(Text)`
  font-size: 16px;
  margin: 20px;
  font-family: ${( props ) => props.theme.FONTS.Poppins_600SemiBold};
  color: #ffff;
  text-align: center;
`;

export const Filtro = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-left: 30px;
  justify-content: space-between;
  padding: 10px;
`;

export const ButtonContainer = styled(View)`
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

export const Column = styled(View)`
  width: 50%; /* Defina a largura máxima desejada, como 50% para duas colunas */
`;