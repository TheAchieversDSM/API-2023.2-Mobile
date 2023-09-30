import { ICheckbox } from "../../interfaces/checkbox";
import { ListItem } from "@rneui/themed";
import React, { useState } from "react";

export const Checkbox = (props: ICheckbox) => {
    return (
        <ListItem style={{ backgroundColor: 'transparent' }}>
            <ListItem.Content>
                <ListItem.CheckBox
                    checkedTitle={props.label}
                    textStyle={{ marginBottom: 2, fontSize: 16, fontWeight: 'normal', fontFamily: 'Poppins_400Regular', textDecorationColor: props.check ? 'black' : 'transparent',
                    textDecorationLine: props.check ? 'line-through' : 'none',
                   }}
                    title={props.label}
                    checked={props.check}
                    onPress={props.onCheck}
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    checkedColor="#c74634"
                />
            </ListItem.Content>
        </ListItem>
    )
}