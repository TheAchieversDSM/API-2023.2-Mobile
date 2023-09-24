import { IButton } from '../../interfaces/button';
import { View } from 'react-native';
import { Btn } from './styled';

export const Button = (props: IButton) => {
    return (
        <View>
            <Btn
                title={props.title} 
                onPress={props.onPress} 
                backgroundColor={props.backgroundColor} 
                width={props.width} 
                borderColor={props.borderColor}
                color={props.color}
                type={props.type}
                fontSize={props.fontSize}
            />
        </View>
    )
}