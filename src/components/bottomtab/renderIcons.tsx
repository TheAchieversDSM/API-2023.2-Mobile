import { FontAwesome, Entypo } from "@expo/vector-icons";
import { IconRenderProps } from '../../interfaces/tabs';
import { styles } from './styled'

export const IconRender = ({ icons, name, isPlusIcon, focused }: IconRenderProps) => {
    switch (icons) {
        case "FontAwesome":
            return (
                <FontAwesome
                    name={name as keyof typeof FontAwesome.glyphMap}
                    size={isPlusIcon ? 35 : 25}
                    style={[isPlusIcon ? styles.plusIconStyled : {
                        color: focused ? '#de0300' : '#393939',
                    }]}
                />
            )

        case "Entypo":
            return (
                <Entypo
                    name={name as keyof typeof Entypo.glyphMap}
                    size={isPlusIcon ? 45 : 25}
                    style={[isPlusIcon ? styles.plusIconStyled : {
                        color: focused ? '#de0300' : '#393939',
                    }]}
                />
            )
    }
}