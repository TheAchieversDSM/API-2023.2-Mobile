import { Overlay, Text } from "@rneui/themed"
import { View } from "react-native"
import styled from "styled-components"

export const CardTask = styled(View)`
  height: 15px;
  background-color: #fff;
  height: 50px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const StatusColor = styled(View)`
  height: 8px;
  font-family: 'Poppins_400Regular';
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

export const TaskName = styled(Text)`
  margin-top: 8px;
  margin-left: 10px;
  font-size: 16px;
  font-family: ${(props) => props.theme.FONTS.Poppins_500Medium};
  color: #393939;
`

export const TaskTitle = styled(Text)`
  font-size: 20px;
  font-family: ${(props) => props.theme.FONTS.Poppins_600SemiBold};
  margin-bottom: 10px;
  color: #393939;
`

export const TaskDesc = styled(Text)`
  font-size: 15px;
  font-family: ${(props) => props.theme.FONTS.Poppins_400Regular};
  margin-bottom: 10px;
  color: #393939;
`

export const TaskDescT = styled(Text)`
  font-family: ${(props) => props.theme.FONTS.Poppins_400Regular};
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #393939;
`

export const Modal = styled(Overlay)`
  padding: 20px;
`

export const ViewIcons = styled(View)`
  justify-content: flex-end;
  flex-direction: row;
  width: 160px;
`

export const ViewCard = styled(View)`
  flex-direction: row;
`

export const ViewData = styled(View)`
  margin-bottom: 5px
`