import { IUpdate } from "../../interfaces/updatemodal";
import { ListItemC } from "./listItem";
import { ListItem } from "@rneui/base";
import { useState } from "react";

export default function Collapse(props: IUpdate) {
    const [expanded, setExpanded] = useState(false);
    const valor = {
        "taskId": 1,
        "user": {
            "id": 3,
            "name": "Tais Salomão "
        },
        "data": "2023-10-27T12:50:23.170Z",
        "campo": {
            "name": {
                "old": "Tarefa de Exemplo",
                "new": "tty"
            },
            "description": {
                "old": "Esta é uma tarefa de exemplo.",
                "new": "zzz"
            }
        },
        "id": "653a608f0dfb3416fb6e5f41"
    }
    return (
        <>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 18, fontFamily: "Poppins_400Regular" }}>{props.data}</ListItem.Title>
                        <ListItem.Subtitle style={{ fontSize: 16, fontFamily: "Poppins_300Light" }}>{props.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={{ width: 330, marginLeft: -16 }}
            >
                <ListItemC {...valor} />
            </ListItem.Accordion>
        </>
    );
}