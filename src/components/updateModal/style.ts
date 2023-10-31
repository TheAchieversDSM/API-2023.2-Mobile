import { Overlay } from "@rneui/themed";
import styled from "styled-components";
import { Text } from "react-native"

export const Modal = styled(Overlay)`
  width: 320px;
  padding: 60px;
  align-items: center;
`;

export const NoUpdate = styled(Text)`
  padding: 20px;
  font-size: 18px;
  font-family: "Poppins_400Regular";
`