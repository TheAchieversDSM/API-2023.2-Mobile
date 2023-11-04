import { IHistoricUpdate } from "../../interfaces/updatemodal";
import { ScrollView } from "react-native";
import { ListItemC } from "./listItem";
import { ListItem } from "@rneui/base";
import { useState } from "react";

export default function Collapse(props: IHistoricUpdate, margin?: number) {    
    const [expanded, setExpanded] = useState(false);
    const [date, setDate] = useState(new Date(props.data))
    
    return (
        <>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 18, fontFamily: "Poppins_400Regular" }}>{date.toLocaleString("pt-br")}</ListItem.Title>
                        <ListItem.Subtitle style={{ fontSize: 16, fontFamily: "Poppins_300Light" }}>Ver mais detalhes</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={{ width: 330, marginLeft: margin || -5 }}
            >
                <ListItemC {...props} />
            </ListItem.Accordion>
        </>
    );
}