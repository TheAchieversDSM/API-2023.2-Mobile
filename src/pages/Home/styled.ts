import { Text } from "@rneui/themed";
import { SafeAreaView, View } from "react-native";
import CalendarHeader from "react-native-calendars/src/calendar/header";
import {styled} from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #393939;
  width: 100%;
`;

export const Box = styled(SafeAreaView)`
  padding: 20px
`;

export const ViewContainer = styled(View)`
  flex: 1;
  background-color: #fff;
  width: 100%;
  borderTopLeftRadius: 30px;
  borderTopRightRadius: 30px;
  marginTop: 20px;
`;

export const TextTitle = styled(Text)`
    color: #de0300;
    font-size: 22px;
    fontWeight: bold;
`;

export const SubTextTitle = styled(Text)`
    color: #c74634;
    font-size: 16px;
    fontWeight: bold;
    marginTop: 10px;
`;