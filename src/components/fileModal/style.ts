import { Overlay } from '@rneui/themed';
import styled from 'styled-components';
import { Text, View } from 'react-native'

export const Modal = styled(Overlay)`
  display: flex;
  width: 320px;
  align-items: center;
`;

export const NoUpdate = styled(Text)`
  padding: 20px;
  font-size: 18px;
  font-family: '${(props) => props.theme.FONTS.Poppins_400Regular}';
`

export const Title = styled(Text)`
  margin-left: 15px;
  margin-top: 10px;
  font-size: 22px;
  font-family: '${(props) => props.theme.FONTS.Poppins_600SemiBold}';
`