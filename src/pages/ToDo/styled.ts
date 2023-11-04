import {SafeAreaView, View} from "react-native";
import styled from "styled-components";
import {Text} from "@rneui/themed";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #222328;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
`;

export const Column1 = styled(View)`
  width: 70%; /* Defina a largura máxima desejada, como 50% para duas colunas */
`;

export const Column2 = styled(View)`
  margin-top: 15px;
  width: 30%; /* Defina a largura máxima desejada, como 50% para duas colunas */
`;

export const Filtro = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const TextStatus1 = styled(Text)`
  font-size: 22px;
  color: white;
  font-family: ${(props) => props.theme.FONTS.Poppins_600SemiBold};
  letter-spacing: 3px;
  border-bottom-width: 2px;
  border-bottom-color: #67d207;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  padding-left: 15px;
  padding-bottom: -15px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextStatus2 = styled(Text)`
  font-size: 22px;
  color: white;
  font-family: ${(props) => props.theme.FONTS.Poppins_600SemiBold};
  letter-spacing: 3px;
  border-bottom-width: 2px;
  border-bottom-color: #ebae11;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  padding-left: 15px;
  padding-bottom: -15px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextStatus3 = styled(Text)`
  font-size: 22px;
  color: white;
  font-family: ${(props) => props.theme.FONTS.Poppins_600SemiBold};
  letter-spacing: 3px;
  border-bottom-width: 2px;
  border-bottom-color: #de0300;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  padding-left: 15px;
  padding-bottom: -15px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
`;
