import {Text} from "@rneui/themed";
import {SafeAreaView, View} from "react-native";
import {styled} from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #393939;
  width: 100%;
`;

export const Box = styled(SafeAreaView)`
  padding: 20px;
`;

export const ViewContainer = styled(View)`
  flex: 1;
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: 20px;
`;

export const TextTitle = styled(Text)`
  color: #c74634;
  font-size: 22px;
  font-weight: bold;
`;

export const SubTextTitle = styled(Text)`
  color: #c74634;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

export const NoTasksText = styled(Text)`
  text-align: center;
  font-size: 18;
  color: "#808080ff";
  margin-top: 120px;
`;
