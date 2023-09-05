import { IInput } from '../../interfaces/input';
import { InputC } from './styled';

export default function Input(props: IInput) {
    return (
        <InputC
            placeholder={props.placeholder}
            rightIcon={{ type: 'font-awesome', name: props.iconR, color: props.color || '#DE0300' }}
            leftIcon={{ type: 'font-awesome', name: props.iconL, color: props.color || '#DE0300' }}
            value={props.value}
            errorMessage={props.errorMsg}
            secureTextEntry={props.password}
            onChangeText={props.onChange}
        />
    )
}