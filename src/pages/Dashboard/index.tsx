import { ScrollView, View, Text } from "react-native";
import { ButtonContainer, Column, Container, Expirado, Filtro } from "./styled";

import { HeaderComponent } from "../../components/header";
import { Coluna } from "../../components/graficos/coluna";
import { Donut } from "../../components/graficos/donut";
import { Divider } from "@rneui/themed";
import { DropdownComponent } from "../../components/dropdown/dropdown";
import { useEffect, useState, useCallback } from "react";
import { Button } from "../../components/button/button";
import { IGetTasksUserResp } from "../../interfaces/task";
import { ITaskCheck } from "../../interfaces/functions";
import { useAuth } from "../../hooks/auth";
import { checkTaskUser, decodeJsonWebToken } from "../../utils/utils";
import serviceTask from "../../service/task";
import { useFocusEffect } from '@react-navigation/native';


const months: Months[] = []

export default function Dashboard() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const [values, setValues] = useState<ITaskCheck>()
    const { userToken } = useAuth()
    const { id } = decodeJsonWebToken(String(userToken))

    useFocusEffect(
        useCallback(() => {
            async function fetchUserTasks() {
                try {
                    const response = await serviceTask.getTaskUser({ userId: id });
                    if (response) {
                        const valores = checkTaskUser(response)
                        setValues(valores)
                    } else {
                        console.error("Erro ao buscar tarefas do usuário");
                    }
                } catch (error) {
                    console.error("Erro ao buscar tarefas do usuário:", error);
                }
            }
            fetchUserTasks();
            return () => {
                setValues(undefined);
            };
        }, [id])
    );

    return (
        <>
            <View style={{ backgroundColor: '#222328' }}><HeaderComponent /></View>
            <Container>
                <View style={{ marginTop: 20 }}>
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
                            <View style={{ marginBottom: -40 }}></View>
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
                            <View style={{ marginBottom: -40 }}></View>
                        </Column>
                    </Filtro>
                    <ButtonContainer>
                        <Button
                            title={"Buscar"}
                            onPress={function (): void {
                                throw new Error("Function not implemented.");
                            }}
                            borderColor='#de0300'
                            backgroundColor='#de0300'
                            type='solid'
                        />
                    </ButtonContainer>
                </View>
                <ScrollView style={{ paddingTop: 20, padding: 10 }}>
                    <Donut
                        doing={values ? values?.doing : 0}
                        done={values ? values?.done : 0}
                        todo={values ? values?.todo : 0}
                    />
                    <Divider />
                    <View>
                        <Expirado>{values?.expirada} tarefas expiraram esse mês</Expirado>
                    </View>
                    <Divider />
                    <Coluna />
                </ScrollView>
            </Container>
        </>
    )
}