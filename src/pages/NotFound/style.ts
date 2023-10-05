import {LinearProgress} from "@rneui/themed";
import {View, Text, Image} from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  background-color: #222328;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Progress = styled(LinearProgress).attrs({
  animation: {
    duration: 10000,
  },
  color: "#DE0300",
})`
  width: 80%;
  height: 10px;
`;

export const Message = styled(Text)`
  color: #f2f2f2;
  width: 80%;
  margin: 5px;
  text-align: justify;
`;
export const MessageDate = styled(Text)`
  width: 80%;
  font-weight: bold;
  text-align: center;
  color: #f2f2f2;
`;
export const MessageTitle = styled(Text)`
  font-family: ${(props) => props.theme.FONTS.Poppins_400Regular};
  font-size: 20px;
  font-weight: bold;
  color: #de0300;
`;

export const Logo = styled(Image).attrs({
  resizeMode: "stretch",
})`
  width: 50%;
  height: 5%;
`;
