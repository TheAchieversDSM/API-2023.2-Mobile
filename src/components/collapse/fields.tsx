import { ListItem } from "@rneui/base"
import { IFields } from "../../interfaces/updatemodal"

export const Field = ({ field }: IFields) => {
    switch (field) {
        case "name":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Nome</ListItem.Title>
        case "description":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Descrição</ListItem.Title>
        case "priority":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Prioridade</ListItem.Title>
        case "status":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Status</ListItem.Title>
        case "done":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Concluído</ListItem.Title>
        case "customInterval":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Intervalo da Tarefas</ListItem.Title>
        case "lastExecution": 
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Última Execução</ListItem.Title>
        case "timeSpent":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Tempo Gasto</ListItem.Title>
        case "deadline":
            return <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>Prazo</ListItem.Title>
    }
}