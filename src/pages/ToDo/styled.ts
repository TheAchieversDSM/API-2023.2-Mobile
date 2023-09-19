import { SafeAreaView, View } from "react-native";
import styled from "styled-components";
import { Card, ListItem, Text } from "@rneui/themed";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #393939;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export const TextStatus1 = styled(Text)`
    font-size: 22px;
    background-color: #67d207;
    border-radius: 10px;
    padding: 5px;
    width: 80px;
    text-align: center;
    marginTop: 10px;
`;

export const TextStatus2 = styled(Text)`
    font-size: 22px;
    background-color: #ebae11;
    border-radius: 10px;
    padding: 5px;
    width: 80px;
    text-align: center;
    marginTop: 10px;
`;

export const TextStatus3 = styled(Text)`
    font-size: 22px;
    background-color: #de0300;
    border-radius: 10px;
    padding: 5px;
    width: 80px;
    text-align: center;
    marginTop: 10px;
`;
