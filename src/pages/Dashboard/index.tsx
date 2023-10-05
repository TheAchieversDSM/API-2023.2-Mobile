import { ScrollView, View, Text } from "react-native";
import { ButtonContainer, Column, Container, Expirado, Filtro } from "./styled";

import { HeaderComponent } from "../../components/header";
import { Coluna } from "../../components/graficos/coluna";
import { Donut } from "../../components/graficos/donut";
import { Divider } from "@rneui/themed";
import { DropdownComponent } from "../../components/dropdown/dropdown";
import { useState } from "react";
import { Button } from "../../components/button/button";

export default function Dashboard() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    return(
        <>
            <View style={{backgroundColor: '#222328'}}><HeaderComponent/></View>
            <Container>
                <View style={{ marginTop: 20}}>
                    <Filtro>
                        <Column>
                            <DropdownComponent
                                data={[
                                    { label: '2023', value: '2023' },
                                    { label: '2022', value: '2022' },
                                    { label: '2021', value: '2021' },
                                ]}
                                placeholder="Ano"
                                onValueChange={(value) => setSelectedYear(value)}
                                value={selectedYear}
                                borderColor='#9a9999'
                                color='#fff'
                                width={160}
                            />
                            <View style={{marginBottom: -40}}></View>
                        </Column>
                        <Column>
                            <DropdownComponent
                                data={[
                                    { label: 'Janeiro', value: 'Janeiro' },
                                    { label: 'Fevereiro', value: 'Fevereiro' },
                                    { label: 'Março', value: 'Março' },
                                ]}
                                placeholder="Mês"
                                onValueChange={(value) => setSelectedMonth(value)}
                                value={selectedMonth}
                                borderColor='#9a9999'
                                color='#fff'
                                width={160}
                            />
                            <View style={{marginBottom: -40}}></View>
                        </Column>
                    </Filtro>
                    <ButtonContainer>
                        <Button
                            title={"Buscar"}
                            onPress={function (): void {
                            throw new Error("Function not implemented.");
                            } }
                            borderColor='#de0300'
                            backgroundColor='#de0300'
                            type='solid'
                        />
                    </ButtonContainer>
                </View>
                <ScrollView style={{paddingTop: 20, padding: 10}}>
                    <Donut/>
                    <Divider />
                    <View>
                        <Expirado>123 tarefas expiraram esse mês</Expirado>
                    </View>
                    <Divider/>
                    <Coluna/>
                </ScrollView>
            </Container>
        </>
    )
}