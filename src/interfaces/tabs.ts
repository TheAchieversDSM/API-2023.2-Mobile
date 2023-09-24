import {FontAwesome, Entypo} from "@expo/vector-icons";

export interface TabBarIconProps {
  focused: boolean;
}

type AllIconKeys =
  | keyof typeof FontAwesome.glyphMap
  | keyof typeof Entypo.glyphMap;

type IconType = "FontAwesome" | "Entypo";

export type IconRenderProps = {
  nameScreen?: string;
  icons: IconType;
  name: AllIconKeys;
  isPlusIcon?: boolean;
  focused: boolean;
};
