import {Text} from "react-native";
import {styled} from "styled-components";

export const Titulo = styled(Text)`
  font-size: 20px;
  font-family: ${(props) => props.theme.FONTS.Poppins_600SemiBold};
  color: #ffff;
  text-align: center;
`;

export const Legenda = styled(Text)`
  font-size: 15px;
  font-family: ${(props) => props.theme.FONTS.Poppins_500Medium};
  color: #ffff;
`;

export const TextDonut = styled(Text)`
  font-family: ${(props) => props.theme.FONTS.Poppins_500Medium};
  color: #ffff;
`;
