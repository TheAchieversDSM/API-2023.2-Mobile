import React, { useEffect, useState } from "react";
import { Container, TextStatus1, TextStatus2, TextStatus3 } from "./styled";
import { Cards } from "../../components/cards/cards";
import serviceTask from "../../service/task";
import { useAuth } from "../../hooks/auth";
import { decodeJsonWebToken } from "../../utils/utils";
import { IGetTasksUserResp } from "../../interfaces/task";
import { ScrollView } from "react-native";

export default function ToDo() {
    const [open, setOpen] = useState(false);
    const [userTasks, setUserTasks] = useState<IGetTasksUserResp[]>();
    const { userToken } = useAuth()

    const { id } = decodeJsonWebToken(String(userToken))

    useEffect(() => {
        async function fetchUserTasks() {
            try {
                const response = await serviceTask.getTaskUser({ userId: id });
                if (response) {
                    setUserTasks(response.data.data);
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
        <Container>
            <ScrollView>
                <TextStatus3>A Fazer</TextStatus3>
                {userTasks
                    ?.filter((task) => task.status === "TO DO")
                    .sort((a, b) => {
                        const priorityOrder = {
                            'High': 3,
                            'Medium': 2,
                            'Low': 1,
                        }

                        const priorityA = priorityOrder[a.priority] || 0
                        const priorityB = priorityOrder[b.priority] || 0

                        return priorityB - priorityA
                    })
                    .map((task, index) =>  (
                        <Cards
                            id={task.id}
                            key={index}
                            task={task.name}
                            descricao={task.description}
                            status='error'
                            value={"A Fazer"}
                            statusColor="#de0300"
                            deadline={task.deadline}
                            priority={task.priority}
                        />
                    )
                )}

                <TextStatus2>Em Progresso</TextStatus2>
                {userTasks
                    ?.filter((task) => task.status === "DOING")
                    .sort((a, b) => {
                        const priorityOrder = {
                            'High': 3,
                            'Medium': 2,
                            'Low': 1,
                        };

                        const priorityA = priorityOrder[a.priority] || 0;
                        const priorityB = priorityOrder[b.priority] || 0;

                        return priorityB - priorityA;
                    })
                    .map((task, index) => (
                        <Cards
                            id={task.id}
                            key={index}
                            task={task.name}
                            descricao={task.description}
                            status='warning'
                            value={"Em Progresso"}
                            statusColor="#ebae11"
                            deadline={task.deadline}
                            priority={task.priority}
                        />
                    )
                )}

                <TextStatus1>Concluído</TextStatus1>
                {userTasks
                    ?.filter((task) => task.status === "DONE")
                    .sort((a, b) => {
                        const priorityOrder = {
                            'High': 3,
                            'Medium': 2,
                            'Low': 1,
                        };

                        const priorityA = priorityOrder[a.priority] || 0;
                        const priorityB = priorityOrder[b.priority] || 0;

                        return priorityB - priorityA;
                    })
                    .map((task, index) => (
                        <Cards
                            id={task.id}
                            key={index}
                            task={task.name}
                            descricao={task.description}
                            status='success'
                            value={"Concluído"}
                            statusColor="#67d207"
                            deadline={task.deadline}
                            priority={task.priority}
                        />
                    )
                    )}
            </ScrollView>
        </Container>
    );
}