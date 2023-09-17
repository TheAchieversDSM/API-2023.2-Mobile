import {KeyboardAvoidingView, ScrollView} from "react-native";
import {Image, SafeAreaView, View} from "react-native";
import styled from "styled-components/native";
import {Button} from "../../components/button/button";

export const Container = styled(SafeAreaView)`
  background-color: #393939;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Logo = styled(Image)`
  width: 80%;
`;

export const TabsContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: -40px;
`;

export const SignUpContainer = styled(View)`
  width: 85%;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding-top: 10em;
`;

export const InputsContainer = styled(View)`
  margin-top: 30;
  width: 100%;
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
