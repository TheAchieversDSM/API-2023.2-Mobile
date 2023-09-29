import { ICheckbox } from "../../interfaces/checkbox";
import { ListItem } from "@rneui/themed";
import React, { useState } from "react";

export const Checkbox = (props: ICheckbox) => {
    const [check, setCheck] = useState(false);
    return (
        <ListItem style={{ backgroundColor: 'transparent' }}>
            <ListItem.Content>
                <ListItem.CheckBox
                    checkedTitle={props.label}
                    textStyle={{ marginBottom: 2, fontSize: 16, fontWeight: 'normal', fontFamily: 'Poppins_400Regular', textDecorationColor: check ? 'black' : 'transparent',
                    textDecorationLine: check ? 'line-through' : 'none',
                   }}
                    title={props.label}
                    checked={check}
                    onPress={() => setCheck(!check)}
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    checkedColor="#c74634"
                />
            </ListItem.Content>
        </ListItem>
    )
}