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
  const {userToken} = useAuth()
  
  const {id} = decodeJsonWebToken(String(userToken))
    useEffect(() => {
      async function fetchUserTasks() {
        try {
          const response = await serviceTask.getTaskUser({ userId: id });
          if (response) {
            setUserTasks(response.data.data);
          } else {
            // Lide com o erro caso não seja possível buscar as tarefas
            console.error("Erro ao buscar tarefas do usuário");
          }
        } catch (error) {
          // Lide com o erro
          console.error(error);
        }
      }

      fetchUserTasks();
    }, []);

    console.log(userTasks)

      return (
        <Container>
            <ScrollView>
              <TextStatus1>DONE</TextStatus1>
              {userTasks?.map((task, index) => (
                task.status === "DONE" && (
                  <Cards
                    key={index}
                    task={task.name} // Substitua 'title' pelo nome correto do campo da tarefa
                    descricao={task.description} // Substitua 'description' pelo nome correto do campo da tarefa
                    status='success'
                    value={task.status}
                    statusColor="#67d207"
                    deadline={task.deadline}
                    priority={task.priority} 
                  />
                )
              ))}
              <TextStatus2>DOING</TextStatus2>
              {userTasks?.map((task, index) => (
                task.status === "DOING" && (
                  <Cards
                    key={index}
                    task={task.name} // Substitua 'title' pelo nome correto do campo da tarefa
                    descricao={task.description} // Substitua 'description' pelo nome correto do campo da tarefa
                    status='warning'
                    value={task.status}
                    statusColor="#ebae11"
                    deadline={task.deadline} 
                    priority={task.priority} 
                  />
                )
              ))}
              <TextStatus3>TO DO</TextStatus3>
              {userTasks?.map((task, index) => (
                task.status === "TO DO" && (
                  <Cards
                    key={index}
                    task={task.name} // Substitua 'title' pelo nome correto do campo da tarefa
                    descricao={task.description} // Substitua 'description' pelo nome correto do campo da tarefa
                    status='error'
                    value={task.status}
                    statusColor="#de0300"
                    deadline={task.deadline}
                    priority={task.priority} 
                  />
                )
              ))}
            </ScrollView>
        </Container>
      );
}