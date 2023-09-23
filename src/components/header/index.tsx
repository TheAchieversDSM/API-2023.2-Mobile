import { Header, Image } from '@rneui/themed';
import oracleLogo from "../../assets/oracle.png"
import { ImageLogo, ViewLogo } from './styled';
import { SafeAreaView, View } from 'react-native';

export const HeaderComponent = () => {
    return(
        <>
            <ViewLogo style={{ backgroundColor: '#393939' }}>
                <ImageLogo
                    source={oracleLogo}
                />
            </ViewLogo>
        </>
    );
}