import { IIcons } from "../../interfaces/icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

import { TouchableOpacity } from "react-native";
import React from "react";

const iconComponents: Record<string, React.ComponentType<any>> = {
    FontAwesome: FontAwesome,
    FontAwesome5: FontAwesome5,
    MaterialIcons: MaterialIcons,
    AntDesign: AntDesign,
    Feather: Feather,
    Entypo: Entypo
};

export const IconModel = ({
    style,
    icon,
    iconName,
    IconColor,
    IconSize,
    onPress,
}: IIcons) => {
    const IconComponent = iconComponents[icon];

    if (!IconComponent) {
        return null;
    }

    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <IconComponent color={IconColor} size={IconSize} name={iconName} />
        </TouchableOpacity>
    );
};
