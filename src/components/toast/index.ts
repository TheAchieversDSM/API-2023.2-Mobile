import Toast from 'react-native-toast-message';
import { IToast } from '../../interfaces/toast';

export function ToastComponent(props: IToast) {
    return (
        Toast.show({
            type: props.type,
            text1: props.title,
        })
    )
}