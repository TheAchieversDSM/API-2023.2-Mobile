import {SafeAreaView, Image, View, Text} from "react-native";
import {styled} from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #393939;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  width: 85%;
  justify-content: space-between;
  padding: 10px;
`;