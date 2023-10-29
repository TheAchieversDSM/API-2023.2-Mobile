import { Overlay, Text } from "@rneui/themed";
import { View } from "react-native";
import styled from "styled-components";

export const Modal = styled(Overlay)`
  width: 100%;
  padding: 60px;
`;

export const Container = styled(View)`
  width: 320px;
`;

export const ContAdd = styled(View)`
  height: 200px;
`;

export const ContLista = styled(View)`
  height: 110px;
`;

export const ButtonCotainer = styled(View)`
  flex-direction: row;
  align-self: flex-end;
  width: 60%;
  justify-content: space-evenly;
  align-items: flex-end;
`;

export const Texto = styled(Text)`
  width: 100%;
  font-size: 18px;
  font-family: ${(props) => props.theme.FONTS.Poppins_500Medium};
  margin-bottom: 10px;
  margin-top: 20px;
  color: #393939;
  margin-left: 3px;
`;

export const UsersList = styled(Text)`
  width: 100%;
  font-size: 16px;
  font-family: ${(props) => props.theme.FONTS.Poppins_400Regular};
  margin-bottom: 8px;
  color: #393939;
  margin-left: 5px;
`;