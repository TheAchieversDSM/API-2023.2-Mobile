import { IPriority } from "../../interfaces/cards"
import { TaskDescT } from "./styled"

export const Priority = ({ priority }: IPriority) => {
    switch (priority) {
        case "High":
            return <TaskDescT>Prioridade: Alta</TaskDescT>
        case "Medium":
            return <TaskDescT>Prioridade: Média</TaskDescT>
        case "Low":
            return <TaskDescT>Prioridade: Baixa</TaskDescT>
    }
}