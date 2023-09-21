import { FontAwesome, Entypo } from "@expo/vector-icons";
import { IconRenderProps } from '../../interfaces/tabs';

export const IconRender = ({ icons, name, isPlusIcon, focused }: IconRenderProps) => {
    switch (icons) {
        case "FontAwesome":
            return (
                <FontAwesome
                    name={name as keyof typeof FontAwesome.glyphMap}
                    size={isPlusIcon ? 35 : 25}
                    style={[isPlusIcon ? {
                        transform: [{ rotate: "-45deg" }],
                    } : {
                        color: focused ? '#C74634' : '#393939',
                    }]}
                />
            )

        case "Entypo":
            return (
                <Entypo
                    name={name as keyof typeof Entypo.glyphMap}
                    size={isPlusIcon ? 35 : 25}
                    style={[isPlusIcon ? {
                        transform: [{ rotate: "-45deg" }],
                    } : {
                        color: focused ? '#393939' : '#393939',
                    }]}
                />
            )
    }
}