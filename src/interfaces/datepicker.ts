import {InputProps} from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export interface IDatePicker extends InputProps {
  iconNameL?: keyof typeof FontAwesome.glyphMap;
  iconNameR?: keyof typeof FontAwesome.glyphMap;
  iconColorL?: string;
  iconColorR?: string;
  iconSize?: number;
  title: string;
  onDateChange: (date: string) => void;
}