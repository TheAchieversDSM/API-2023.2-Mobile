import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleProp, ViewStyle } from "react-native";

export type AllIconKeys =
  | keyof typeof FontAwesome.glyphMap
  | keyof typeof FontAwesome5.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof AntDesign.glyphMap
  | keyof typeof Feather.glyphMap
  | keyof typeof Entypo.glyphMap

export type IconType = "FontAwesome" | "MaterialIcons" | "AntDesign" | "FontAwesome5" | "Feather" | "Entypo";

export interface IIcons {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  iconName: AllIconKeys;
  icon: IconType;
  IconColor: string;
  IconSize: number;
}
