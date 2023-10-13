import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #222328;
  align-items: center;
  width: 100%;
`;

export const Nome = styled(Text)`
  color: #ffff;
  font-family: ${( props ) => props.theme.FONTS.Poppins_600SemiBold};
  font-size: 20px;
`;

export const Email = styled(Text)`
  color: #C5C5C5;
  font-family: ${( props ) => props.theme.FONTS.Poppins_400Regular};
  font-size: 15px;
`;

export const ContainerOptions = styled(View)`
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-inline: 20px;
  margin-top: 20px;
  width: 200px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #DE0300;
`;

export const Logout = styled(Text)`
  color: white;
  font-family: ${( props ) => props.theme.FONTS.Poppins_400Regular};
  font-size: 15px;
  margin-top: 10px;
`;