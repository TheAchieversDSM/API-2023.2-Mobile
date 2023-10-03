import { Cards } from "../../components/cards/cards"
import { IGetTasksUserResp } from "../../interfaces/task"

export const ViewCards = ({  ...task }: IGetTasksUserResp) => {
    switch (task.status) {
        case "TO DO":
            return (
                <Cards
                    id={task.id}
                    key={task.id}
                    task={task.name}
                    descricao={task.description}
                    status='error'
                    value={"A Fazer"}
                    statusColor="#de0300"
                    deadline={task.deadline}
                    priority={task.priority}
                />
            )
        case "DOING":
            return (
                <Cards
                    id={task.id}
                    key={task.id}
                    task={task.name}
                    descricao={task.description}
                    status='error'
                    value={"Em Progresso"}
                    statusColor="#ebae11"
                    deadline={task.deadline}
                    priority={task.priority}
                />
            )
        case "DONE":
            return (
                <Cards
                    id={task.id}
                    key={task.id}
                    task={task.name}
                    descricao={task.description}
                    status='error'
                    value={"Concluido"}
                    statusColor="#67d207"
                    deadline={task.deadline}
                    priority={task.priority}
                />
            )
    }
}