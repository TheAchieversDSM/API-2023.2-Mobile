import { ScrollView, View } from "react-native";
import { Overlay, Text } from "@rneui/themed";
import styled from "styled-components";

export const CardTask = styled(View).attrs({
  style: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  }
})`
  height: 15px;
  background-color: #fff;
  height: 50px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  `;

export const StatusColor = styled(View)`
  height: 8px;
  font-family: "Poppins_400Regular";
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const TaskName = styled(Text)`
  margin-top: 8px;
  margin-left: 10px;
  font-size: 16px;
  font-family: ${(props) => props.theme.FONTS.Poppins_500Medium};
  color: #393939;
`;

export const SubtaskDone = styled(Text)`
  color: #848484;
`;

export const TaskTitle = styled(Text)`
  width: 100%;
  font-size: 20px;
  font-family: ${(props) => props.theme.FONTS.Poppins_600SemiBold};
  margin-bottom: 10px;
  color: #393939;
`;

export const TaskDesc = styled(Text)`
  font-size: 15px;
  font-family: ${(props) => props.theme.FONTS.Poppins_400Regular};
  margin-top: -10px;
  margin-bottom: 10px;
  color: #848484;
`;

export const TaskDescT = styled(Text)`
  font-family: ${(props) => props.theme.FONTS.Poppins_400Regular};
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #393939;
`;

export const Modal = styled(Overlay)`
  width: 320px;
  padding: 60px;
`;

export const ViewScroll = styled(ScrollView)`
  width: 320px;
`;

export const ViewIcons = styled(View)`
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
`;

export const ViewIcon = styled(View)`
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
`;

export const ViewCard = styled(View)`
  display: flex;
  flex-direction: column;
`;

export const ViewData = styled(View)`
  width: 330px;
  margin-bottom: 5px;
`;

export const GeneralView = styled(View)`
  width: 320px;
  padding-top: 5px;
  padding-left: 10px;
`;

export const InputView = styled(View)`
  padding-top: 15px;
  padding-bottom: 10px;
  margin: -30px;
  width: 360px;
`;

export const ViewName = styled(View)`
  width: 100%;
  height: fit-content;
`;