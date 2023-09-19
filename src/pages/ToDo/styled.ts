import { SafeAreaView, View } from "react-native";
import styled from "styled-components";
import { Card, ListItem, Text } from "@rneui/themed";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #393939;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
`;

export const TextStatus1 = styled(Text)`
    font-size: 22px;
    color: white;
    font-family: ${( props ) => props.theme.FONTS.Poppins_600SemiBold};
    letter-spacing: 3px;
    border-bottom-width: 2px;
    border-bottom-color: #67d207;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
    padding-left: 15px;
    padding-bottom: -15px;
    text-align: start;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const TextStatus2 = styled(Text)`
    font-size: 22px;
    color: white;
    font-family: ${( props ) => props.theme.FONTS.Poppins_600SemiBold};
    letter-spacing: 3px;
    border-bottom-width: 2px;
    border-bottom-color: #ebae11;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
    padding-left: 15px;
    padding-bottom: -15px;
    text-align: start;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const TextStatus3 = styled(Text)`
    font-size: 22px;
    color: white;
    font-family: ${( props ) => props.theme.FONTS.Poppins_600SemiBold};
    letter-spacing: 3px;
    border-bottom-width: 2px;
    border-bottom-color: #de0300;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
    padding-left: 15px;
    padding-bottom: -15px;
    text-align: start;
    margin-top: 10px;
    margin-bottom: 10px;
`;
