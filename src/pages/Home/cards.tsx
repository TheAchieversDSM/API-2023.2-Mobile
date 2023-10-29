import { useState } from "react";
import { Cards } from "../../components/cards/cards"
import { IGetTasksUserResp } from "../../interfaces/task"

export const ViewCards = ({ ...task }: IGetTasksUserResp) => {
    const [reload, setReload] = useState(false);
    const reloadTasksData = () => {
        setReload(!reload);
    };
    switch (task.status) {
        case "TO DO":
            return (
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
        case "DOING":
            return (
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
        case "DONE":
            return (
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
    }
}