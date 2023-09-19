import { Overlay, Text } from "@rneui/themed"
import { View } from "react-native"
import styled from "styled-components"

export const CardTask = styled(View)`
  height: 15px;
  background-color: #fff;
  height: 50px;
  borderRadius: 10px;
  marginTop: 10px;
  marginBottom: 10px;
`

export const StatusColor = styled(View)`
  height: 8px;
  borderTopLeftRadius: 10px;
  borderTopRightRadius: 10px;
`

export const TaskName = styled(Text)`
  marginTop: 8px;
  marginLeft: 10px;
  fontSize: 16px;
  fontWeight: 600;
  color: #393939;
`

export const TaskTitle = styled(Text)`
  fontSize: 22px;
  fontWeight: 700;
  marginBottom: 10px;
  color: #393939;
`

export const TaskDesc = styled(Text)`
  fontSize: 16px;
  marginBottom: 10px;
  color: #393939;
`

export const TaskDescT = styled(Text)`
  fontSize: 18px;
  marginBottom: 5px;
  fontWeight: 600;
  color: #393939;
`

export const Modal = styled(Overlay)`
  padding: 20px;
`

export const ViewIcons = styled(View)`
  justifyContent: flex-end;
  flexDirection: row;
  width: 160px;
`

export const ViewCard = styled(View)`
  flexDirection: row;
`

export const ViewData = styled(View)`
  marginBottom: 5px
`