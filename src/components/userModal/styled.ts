import styled from "styled-components";
import { View, Text } from "react-native";
import { Overlay } from "@rneui/themed";

export const Logout = styled(Text)`
  color: #fff;
  font-family: ${( props ) => props.theme.FONTS.Poppins_400Regular};
  font-size: 15px;
  margin-top: 10px;
`;

export const Modal = styled(Overlay)`
  width: 320px;
  padding: 60px;
  align-items: center;
`;

export const TaskDescT = styled(Text)`
  font-family: ${(props) => props.theme.FONTS.Poppins_400Regular};
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #393939;
`;

export const InputView = styled(View)`
  padding-top: 15px;
  padding-bottom: 10px;
  margin: -30px;
  width: 360px;
`;

export const GeneralView = styled(View)`
  width: 320px;
  padding-top: 5px;
  padding-left: 10px;
`;

export const ViewIcons = styled(View)`
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
`;

export const ViewIcon = styled(View)`
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
`;
