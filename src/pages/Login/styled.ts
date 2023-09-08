import {styled} from "styled-components/native";
import {SafeAreaView, Image, View, Text} from "react-native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #393939;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TabsContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

export const LoginContainer = styled(View)`
  height: 250px;
  width: 85%;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const InputsContainer = styled(View)`
  width: 100%;
  margin-top: 15px;
`;

export const ErrorMessage = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  color: red;
`;

export const Logo = styled(Image)`
  height: 50px;
  width: 100%;
  margin: 15px;
`;
