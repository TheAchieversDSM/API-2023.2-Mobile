import * as S from "./styled";
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
import { DropdownComponent } from "../../components/dropdown/dropdown";
import { opcoes } from "../../interfaces/compartilhado";

export default function ToDo() {
    const [userTasks, setUserTasks] = useState<IGetTasksUserResp[]>([]);
    const [reload, setReload] = useState(false);
    const { userToken } = useAuth();
    const [searchText, setSearchText] = useState('');
    const [prioridade, setPrioridade] = useState("");
    const [selectedButton, setSelectedButton] = useState(-1);
    const [filtro, setFiltro] = useState("nomeTarefa");
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

    useEffect(() => {
        setFiltro(filtro);
      }, [filtro]);

    const reloadTasksData = () => {
        setReload(!reload);
    };

    const filterTasks = (task: IGetTasksUserResp) => {
        if (filtro === "nomeTarefa") {
          // Filtra pelo nome da tarefa
          return (
            task.name.toLowerCase().includes(searchText.toLowerCase())
          );
        } else if (filtro === "emailUser") {
          // Filtra pelo email do usuário compartilhado
          return (
            task.users?.some((user: { name: string; email: string }) =>
              user.email.toLowerCase().includes(searchText.toLowerCase())
            )
          );
        } else {
          // Outros tipos de filtro podem ser adicionados aqui
          return true;
        }
      };

    return (
        <>
            <View style={{ backgroundColor: '#222328' }}><HeaderComponent /></View>
            <S.Container>
                <S.Filtro>
                    <S.Column1>
                        <SearchBar
                            placeholder="Pesquisar tarefa..."
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
                            inputStyle={{ fontFamily: theme.FONTS.Poppins_400Regular}}
                            onChangeText={text => setSearchText(text)}
                            value={searchText}
                        />
                    </S.Column1>
                    <S.Column2>
                        <DropdownComponent
                            data={opcoes}
                            placeholder="Tipo"
                            iconSelectedName="check"
                            value={filtro}
                            borderColor='#fff'
                            color='#86939E'
                            width={120} 
                            onValueChange={(value) => setFiltro(value)}   
                            showIcon={false}              
                        />
                    </S.Column2>
                </S.Filtro>
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
                    containerStyle={{ marginBottom: 20, marginTop: -15, width: "100%", marginLeft: 0 }}
                />
                <ScrollView>
                    <S.TextStatus3>A Fazer</S.TextStatus3>
                    {userTasks
                        ?.filter(
                            (task) =>
                            task.status === "TO DO" &&
                            task.customInterval === 0 &&
                            (prioridade === "" || task.priority === prioridade) &&
                            filterTasks(task)
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
                                statusEnum={task.status}
                                status='error'
                                customInterval={task.customInterval}
                                value={"A Fazer"}
                                statusColor="#de0300"
                                deadline={task.deadline}
                                sharedUsersIds={task.sharedUsersIds as number[]}
                                priority={task.priority}
                                users={task.users}  
                            />
                        )
                        )}

                    <S.TextStatus2>Em Progresso</S.TextStatus2>
                    {userTasks
                        ?.filter(
                            (task) =>
                                task.status === "DOING" &&
                                task.customInterval === 0 &&
                                (prioridade === "" || task.priority === prioridade) &&
                                filterTasks(task)
                        )
                        .map((task, index) => (
                            <Cards
                                reload={reload}
                                reloadTasksData={reloadTasksData}
                                timeSpent={task.timeSpent}
                                id={task.id}
                                key={task.id}
                                task={task.name}
                                statusEnum={task.status}
                                descricao={task.description}
                                status='warning'
                                customInterval={task.customInterval}
                                value={"Em Progresso"}
                                statusColor="#ebae11"
                                deadline={task.deadline}
                                sharedUsersIds={task.sharedUsersIds as number[]}
                                priority={task.priority}
                                users={task.users}  
                            />
                        )
                        )}

                    <S.TextStatus1>Concluído</S.TextStatus1>
                    {userTasks
                        ?.filter(
                            (task) => 
                            task.status === "DONE" &&
                            task.customInterval === 0 &&
                            (prioridade === "" || task.priority === prioridade) &&
                            filterTasks(task)
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
                                statusEnum={task.status}
                                status='success'
                                customInterval={task.customInterval}
                                value={"Concluído"}
                                statusColor="#67d207"
                                deadline={task.deadline}
                                sharedUsersIds={task.sharedUsersIds as number[]}
                                priority={task.priority} 
                                users={task.users}                            
                            />
                        )
                        )}
                </ScrollView>
            </S.Container>
        </>
    );
}