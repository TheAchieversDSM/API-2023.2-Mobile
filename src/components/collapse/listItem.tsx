import { ListItem } from "@rneui/base";
import { IItems } from "../../interfaces/updatemodal";

export const ListItemC = (props: IItems) => {
    const ObjectList = ["name", "description", "priority", "status", "done", "customInterval", "lastExecution", "timeSpent", "deadline"];
    return (
        <ListItem style={{ marginTop: -15 }}>
            <ListItem.Content>
                <ListItem.Subtitle style={{ fontSize: 13, fontFamily: "Poppins_600SemiBold_Italic", color: "grey", marginBottom: 5, marginTop: -10 }}>Autor: {props.user.name}</ListItem.Subtitle>
                {ObjectList.map(itens => {
                    if (props.campo[itens]) {
                        return (
                            <>
                                <ListItem.Title style={{ fontFamily: "Poppins_600SemiBold" }}>{itens}</ListItem.Title>

                                <ListItem.Subtitle style={{ fontSize: 15, fontFamily: "Poppins_400Regular", marginTop: -2 }}>Valor anterior: </ListItem.Subtitle>

                                <ListItem.Subtitle style={{ fontSize: 15, fontFamily: "Poppins_400Regular", color: "#696969", marginTop: -4 }}>{props.campo[itens].old}</ListItem.Subtitle>

                                <ListItem.Subtitle style={{ fontSize: 15, fontFamily: "Poppins_400Regular", marginTop: 3 }}>Valor atualizado: </ListItem.Subtitle>

                                <ListItem.Subtitle style={{ fontSize: 15, fontFamily: "Poppins_400Regular", color: "#696969", marginTop: -4 }}>{props.campo[itens].new}</ListItem.Subtitle>
                            </>
                        )
                    }
                })}


            </ListItem.Content>
        </ListItem>
    )
}