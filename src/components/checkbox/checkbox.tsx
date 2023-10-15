import { ICheckbox } from "../../interfaces/checkbox";
import { ListItem } from "@rneui/themed";
import React from "react";

export const Checkbox = (props: ICheckbox) => {
    return (
        <ListItem containerStyle={{backgroundColor: props.backgroundColor || "transparent"}}>
            <ListItem.Content>
                <ListItem.CheckBox
                    checkedTitle={props.label}
                    textStyle={{ marginBottom: 2, fontSize: 17, fontWeight: 'normal', fontFamily: 'Poppins_400Regular', textDecorationColor: props.check ? 'black' : 'transparent',
                    textDecorationLine: props.check && props.cross !== false ? 'line-through' : 'none',
                    color: props.color || 'black'
                   }}
                    title={props.label}
                    checked={props.check}
                    onLongPress={props.onLongPress}
                    onPress={props.onCheck}
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    checkedColor="#de0300"

                />
            </ListItem.Content>
        </ListItem>
    )
}