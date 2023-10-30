import { IDynamicHistoric, IHistoricUpdate, IUpdate } from "../../interfaces/updatemodal";
import { api } from "../../service/api";
import { ListItemC } from "./listItem";
import { ListItem } from "@rneui/base";
import { useState } from "react";

export default function Collapse(props: IHistoricUpdate) {    
    const [expanded, setExpanded] = useState(false);
    
    return (
        <>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 18, fontFamily: "Poppins_400Regular" }}>{props.data.slice(0, 10)}</ListItem.Title>
                        <ListItem.Subtitle style={{ fontSize: 16, fontFamily: "Poppins_300Light" }}>Ver mais detalhes</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={{ width: 330, marginLeft: -5 }}
            >
                <ListItemC {...props} />
            </ListItem.Accordion>
        </>
    );
}