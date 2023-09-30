import { Container, TextStatus1, TextStatus2, TextStatus3 } from "./styled";
import { Cards } from "../../components/cards/cards";
import React, { useEffect, useState } from "react";
import serviceTask from "../../service/task";
import { useAuth } from "../../hooks/auth";
import { decodeJsonWebToken } from "../../utils/utils";
import { IGetTasksUserResp } from "../../interfaces/task";
import { ScrollView, View } from "react-native";
import { HeaderComponent } from "../../components/header";

export default function ToDo() {
    const [userTasks, setUserTasks] = useState<IGetTasksUserResp[]>();
    const { userToken } = useAuth()

    const { id } = decodeJsonWebToken(String(userToken))

    useEffect(() => {
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
    }, [userTasks]);

    return (
        <>
        <View style={{backgroundColor: '#393939'}}><HeaderComponent/></View>
        <Container>
            <ScrollView>
                <TextStatus3>A Fazer</TextStatus3>
                {userTasks
                    ?.filter((task) => task.status === "TO DO")
                    .map((task, index) => (
                        <Cards
                            timeSpent={task.timeSpent}
                            id={task.id}
                            key={task.id}
                            task={task.name}
                            descricao={task.description}
                            status='error'
                            value={"A Fazer"}
                            statusColor="#de0300"
                            deadline={task.deadline}
                            taskStatus={task.status}
                            priority={task.priority}
                        />
                    )
                    )}

                <TextStatus2>Em Progresso</TextStatus2>
                {userTasks
                    ?.filter((task) => task.status === "DOING")
                    .map((task, index) => (
                        <Cards
                            timeSpent={task.timeSpent}
                            id={task.id}
                            key={task.id}
                            task={task.name}
                            descricao={task.description}
                            status='warning'
                            value={"Em Progresso"}
                            statusColor="#ebae11"
                            deadline={task.deadline}
                            priority={task.priority}
                            taskStatus={task.status}
                        />
                    )
                    )}

                <TextStatus1>Concluído</TextStatus1>
                {userTasks
                    ?.filter((task) => task.status === "DONE")
                    .map((task, index) => (
                        <Cards
                            timeSpent={task.timeSpent}
                            id={task.id}
                            key={task.id}
                            task={task.name}
                            descricao={task.description}
                            status='success'
                            value={"Concluído"}
                            taskStatus={task.status}
                            statusColor="#67d207"
                            deadline={task.deadline}
                            priority={task.priority}
                        />
                    )
                    )}
            </ScrollView>
        </Container>
        </>
    );
}