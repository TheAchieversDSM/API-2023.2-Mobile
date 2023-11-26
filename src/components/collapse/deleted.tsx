import { IHistoricDelete } from "../../interfaces/updatemodal";
import { ScrollView } from "react-native";
import { ListItemC } from "./listItem";
import { ListItem } from "@rneui/base";
import { useState } from "react";

export default function CollapseD(props: IHistoricDelete, margin?: number) {    
    const [expanded, setExpanded] = useState(false);
    const [date, setDate] = useState(new Date(props.date))
    
    return (
        <>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 18, fontFamily: "Poppins_400Regular", color: "#de0300" }}>Deletado - {date.toLocaleString("pt-br")}</ListItem.Title>
                        <ListItem.Subtitle style={{ fontSize: 16, fontFamily: "Poppins_300Light" }}>Ver mais detalhes</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={{ width: 330, marginLeft: margin || -5 }}
            >
                <ListItem style={{ marginTop: -15 }}>
                    <ListItem.Content>
                        <ListItem.Subtitle style={{ fontSize: 13, fontFamily: "Poppins_600SemiBold_Italic", color: "grey", marginBottom: 5, marginTop: -10 }}>Autor: {props.user.name}</ListItem.Subtitle>
                        <ListItem.Subtitle style={{ fontSize: 15, fontFamily: "Poppins_400Regular", marginTop: 3 }}>Motivo da exclusão: </ListItem.Subtitle>
                        <ListItem.Subtitle style={{ fontSize: 15, fontFamily: "Poppins_400Regular", color: "#696969", marginTop: -4 }}>{props.message}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </ListItem.Accordion>
        </>
    );
}