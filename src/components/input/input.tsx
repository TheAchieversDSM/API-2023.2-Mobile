import { IInput } from '../../interfaces/input';
import { InputC } from './styled';

export default function Input(props: IInput) {
    return (
        <InputC
            placeholder={props.placeholder}
            rightIcon={{ type: 'font-awesome', name: props.iconR, color: props.color || '#DE0300', size: props.iconRightSize || 25 }}
            leftIcon={{ type: 'font-awesome', name: props.iconL, color: props.color || '#DE0300', size: props.iconLeftSize || 25 }}
            value={props.value}
            color={props.textColor}
            errorMessage={props.errorMsg}
            errorStyle={props.errorStyle}
            secureTextEntry={props.password}
            onChange={props.onChange}
            onSubmitEditing={props.onSubmitEditing}
            marginBottom={props.marginBottom}
            height={props.height}
            multiline={props.multiline}
            numberOfLines={props.numberLines}
            fontSize={props.fontSize || 18}
        />
    )
}