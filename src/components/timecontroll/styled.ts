import {View} from "react-native";
import {Overlay, Text} from "@rneui/themed";
import styled from "styled-components";

export const OverlaySyld = styled(Overlay)`
  width: 100%;
`;

export const TaskName = styled(Text)`
  width: 100%;
  font-size: 20px;
  font-family: ${(props) => props.theme.FONTS.Poppins_500Medium};
  margin-bottom: 10px;
  color: #393939;
`;

export const Container = styled(View)`
  width: 320px;
`;
export const ButtonCotainer = styled(View)`
  flex-direction: row;
  align-self: flex-end;
  width: 60%;
  justify-content: space-evenly;
  align-items: flex-end;
`;

export const DescContainer = styled(View)`
  align-items: center;
`;
export const DescText = styled(Text)`
  font-family: ${(props) => props.theme.FONTS.Poppins_500Medium};
  font-size: 18px;
  color: #393939;
`;

export const DescTimes = styled(Text)`
  width: 80%;
`;
