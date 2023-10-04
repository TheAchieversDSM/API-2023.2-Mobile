import { ScrollView, View } from "react-native";
import { Container } from "./styled";

import { HeaderComponent } from "../../components/header";
import { Coluna } from "../../components/graficos/coluna";
import { Donut } from "../../components/graficos/donut";

export default function Dashboard() {




    return(
        <>
            <View style={{backgroundColor: '#222328'}}><HeaderComponent/></View>
            <Container>
                <ScrollView style={{paddingTop: 20, padding: 10}}>
                    <Coluna/>
                    <Donut/>
                </ScrollView>
            </Container>
        </>
    )
}