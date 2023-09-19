import {styled} from "styled-components/native";
import {SafeAreaView, Image, View, Text, ScrollView} from "react-native";

export const Container = styled(SafeAreaView)`
  background-color: #393939;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const TabsContainer = styled(View)`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

export const LoginContainer = styled(View)`
  width: 85%;
  background-color: #e7e7e7;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

export const InputsContainer = styled(View)`
  padding-top: 30px;
  width: 100%;
`;

export const ErrorMessage = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  color: red;
`;

export const Logo = styled(Image).attrs({
  resizeMode: "stretch",
})`
  width: 80%;
  height: 10%;
`;

export const ButtonContainer = styled(View)`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 15px;
`;

export const Scroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
`;
