import { ListItem } from "@rneui/themed";
import React, { useState } from "react";
import { ICheckbox } from "../../interfaces/checkbox";

export const Checkbox = (props: ICheckbox) => {
    const [check, setCheck] = useState(false);
    return (
        <ListItem style={{backgroundColor: 'transparent'}}>
            <ListItem.Content>
                <ListItem.CheckBox
                    title={props.label}
                    checked={check}
                    onPress={() => setCheck(!check)}
                    containerStyle = {{
                        backgroundColor: 'transparent',
                    }}
                    checkedColor="#c74634"
                />
            </ListItem.Content>
        </ListItem>
    )
}