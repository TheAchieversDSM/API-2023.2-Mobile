import { Container, TextStatus1, TextStatus2, TextStatus3 } from "./styled";
import { Cards } from "../../components/cards/cards";
import React, { useCallback, useEffect, useState } from "react";
import serviceTask from "../../service/task";
import { useAuth } from "../../hooks/auth";
import { decodeJsonWebToken } from "../../utils/utils";
import { IGetTasksUserResp } from "../../interfaces/task";
import { ScrollView, View } from "react-native";
import { HeaderComponent } from "../../components/header";
import { useFocusEffect } from "@react-navigation/native";
import { ButtonGroup, SearchBar } from "@rneui/themed";
import { useTheme } from "styled-components";

export default function ToDo() {
    const [userTasks, setUserTasks] = useState<IGetTasksUserResp[]>([]);
    const [reload, setReload] = useState(false);
    const { userToken } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [prioridade, setPrioridade] = useState("");
    const [selectedButton, setSelectedButton] = useState(-1);
    const theme = useTheme()

    const { id } = decodeJsonWebToken(String(userToken))

    useFocusEffect(
        useCallback(() => {
            async function fetchUserTasks() {
                try {
                    const response = await serviceTask.getTaskUser({ userId: id });
                    if (response) {
                        setUserTasks(response);
                    } else {
                        console.error("Erro ao buscar tarefas do usuário");
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            fetchUserTasks();
            setReload(false)
            return () => {
                setUserTasks([])
            }
        }, [id, reload])
    )

    const reloadTasksData = () => {
        setReload(!reload);
    };

    return (
        <>
            <View style={{ backgroundColor: '#222328' }}><HeaderComponent /></View>
            <Container>
                <SearchBar
                    placeholder="Pesquisar..."
                    containerStyle={{
                        backgroundColor: '#222328',
                        borderWidth: 1, 
                        borderTopColor: '#222328',
                        borderLeftColor: '#222328',
                        borderRightColor: '#222328',
                        borderBottomColor: '#ffff', 
                        borderRadius: 0,
                        marginBottom: 20,
                    }}
                    inputContainerStyle={{
                        backgroundColor: '#222328',
                    }}
                    inputStyle={{ fontFamily: theme.FONTS.Poppins_500Medium }}
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                />
                <ButtonGroup
                    buttons={['Baixa', 'Média', 'Alta']}
                    selectedIndex={selectedButton}
                    onPress={(selectedIndex) => {
                        // Se o mesmo botão for clicado novamente, limpe o filtro
                        if (selectedIndex === selectedButton) {
                            setPrioridade('');
                            setSelectedButton(-1);
                        } else {
                            // Determine a prioridade com base no índice do botão
                            const priority = selectedIndex === 0 ? 'Low' : selectedIndex === 1 ? 'Medium' : 'High';
                            setPrioridade(priority);
                            setSelectedButton(selectedIndex);
                        }
                    }}
                    textStyle={{ fontFamily: theme.FONTS.Poppins_500Medium, fontSize: 16 }}
                    containerStyle={{ marginBottom: 20 }}
                />
                <ScrollView>
                    <TextStatus3>A Fazer</TextStatus3>
                    {userTasks
                        ?.filter(
                            (task) =>
                                task.status === "TO DO" && 
                                task.customInterval === 0 && 
                                (
                                    prioridade === '' || task.priority === prioridade
                                ) && 
                                (
                                    // Verificar se o searchText está presente no nome ou email de qualquer usuário
                                    task.users.some((user: { name: string; email: string; }) => 
                                        user.name.toLowerCase().includes(searchText.toLowerCase()) || 
                                        user.email.toLowerCase().includes(searchText.toLowerCase())
                                    ) ||
                                    // Verificar se o searchText está presente no nome da tarefa
                                    task.name.toLowerCase().includes(searchText.toLowerCase())
                                )
                        )
                        .map((task, index) => (
                            <Cards
                                reloadTasksData={reloadTasksData}
                                reload={reload}
                                timeSpent={task.timeSpent}
                                id={task.id}
                                key={task.id}
                                task={task.name}
                                descricao={task.description}
                                status='error'
                                customInterval={task.customInterval}
                                value={"A Fazer"}
                                statusColor="#de0300"
                                deadline={task.deadline}
                                sharedUsersIds={task.sharedUsersIds}
                                priority={task.priority}
                                users={task.users}  
                            />
                        )
                        )}

                    <TextStatus2>Em Progresso</TextStatus2>
                    {userTasks
                        ?.filter(
                            (task) => task.status === "DOING" && 
                            task.customInterval === 0 && 
                            (
                                prioridade === '' || task.priority === prioridade
                            ) && 
                            (
                                // Verificar se o searchText está presente no nome ou email de qualquer usuário
                                task.users.some((user: { name: string; email: string; }) => 
                                    user.name.toLowerCase().includes(searchText.toLowerCase()) || 
                                    user.email.toLowerCase().includes(searchText.toLowerCase())
                                ) ||
                                // Verificar se o searchText está presente no nome da tarefa
                                task.name.toLowerCase().includes(searchText.toLowerCase())
                            )
                        )
                        .map((task, index) => (
                            <Cards
                                reload={reload}
                                reloadTasksData={reloadTasksData}
                                timeSpent={task.timeSpent}
                                id={task.id}
                                key={task.id}
                                task={task.name}
                                descricao={task.description}
                                status='warning'
                                customInterval={task.customInterval}
                                value={"Em Progresso"}
                                statusColor="#ebae11"
                                deadline={task.deadline}
                                sharedUsersIds={task.sharedUsersIds}
                                priority={task.priority}
                                users={task.users}  
                            />
                        )
                        )}

                    <TextStatus1>Concluído</TextStatus1>
                    {userTasks
                        ?.filter(
                            (task) => task.status === "DONE" && 
                            task.customInterval == 0 && 
                            (
                                prioridade === '' || task.priority === prioridade
                            ) && 
                            (
                                // Verificar se o searchText está presente no nome ou email de qualquer usuário
                                task.users.some((user: { name: string; email: string; }) => 
                                    user.name.toLowerCase().includes(searchText.toLowerCase()) || 
                                    user.email.toLowerCase().includes(searchText.toLowerCase())
                                ) ||
                                // Verificar se o searchText está presente no nome da tarefa
                                task.name.toLowerCase().includes(searchText.toLowerCase())
                            )
                        )
                        .map((task, index) => (
                            <Cards
                                reload={reload}
                                reloadTasksData={reloadTasksData}
                                timeSpent={task.timeSpent}
                                id={task.id}
                                key={task.id}
                                task={task.name}
                                descricao={task.description}
                                status='success'
                                customInterval={task.customInterval}
                                value={"Concluído"}
                                statusColor="#67d207"
                                deadline={task.deadline}
                                sharedUsersIds={task.sharedUsersIds}
                                priority={task.priority} 
                                users={task.users}                            
                            />
                        )
                        )}
                </ScrollView>
            </Container>
        </>
    );
}