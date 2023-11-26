import {SafeAreaView, View, ScrollView} from "react-native";
import {styled} from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #222328;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 30px;
`;

export const ViewScroll = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

export const ErrorText = styled.Text`
  color: white;
  font-size: 15px;
  margin-top: -20px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled(View)`
  flex-direction: row;
  width: 85%;
  margin-left: 30px;
  justify-content: space-between;
  padding: 10px;
`;

export const FileContainer = styled(View)`
  flex-direction: column;
  width: 85%;
  margin-left: 30px;
  justify-content: space-between;
  padding: 10px;
`

export const FileText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: 'Poppins_600SemiBold';
`;

export const FileSubtext = styled.Text`
  color: white;
  font-size: 14px;
  font-family: 'Poppins_600Regular';
`;