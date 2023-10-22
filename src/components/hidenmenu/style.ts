import {View} from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  align-items: flex-end;
  width: 85%;
`;
export const ContainerIcons = styled(View)`
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: flex-end;
  width: 100%;
  top: 30px;
  height: fit-content;
  background-color: white;
`;
