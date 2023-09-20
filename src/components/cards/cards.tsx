import { View } from "react-native"
import { CardTask, Modal, StatusColor, TaskDesc, TaskDescT, TaskName, TaskTitle, ViewCard, ViewData, ViewIcons } from "./styled"
import { Badge, Icon, Overlay, SpeedDial, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { ICards } from "../../interfaces/cards";
import React from "react";

export const Cards = (props: ICards) => {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
    setVisible(!visible);
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleOverlay}>
                <CardTask>
                    <StatusColor style={{backgroundColor: props.statusColor}}></StatusColor>
                    <TaskName>{props.task}</TaskName>
                </CardTask>
            </TouchableOpacity>
            <Modal isVisible={visible} onBackdropPress={toggleOverlay}>
                <ViewCard>
                    <View>
                        <TaskTitle>{props.task}</TaskTitle>
                        <Badge
                            status={props.status}
                            value={props.value}
                            containerStyle={{ position: 'absolute', top: 6, right: -90 }}
                        />
                    </View>
                    
                    <ViewIcons>
                        <Icon
                            name='edit'
                            color='#13a7e6'
                            size={30}
                        />
                        <Icon
                            name='delete'
                            color='#de0300'
                            size={30}
                        />
                    </ViewIcons>
                </ViewCard>
                
                <ViewData>
                    <Text style={{fontSize: 15, color: '#808080'}}>Expira em</Text>
                    <Text style={{fontSize: 16}}>{props.date}</Text>
                </ViewData>
                
                <TaskDescT>Descrição</TaskDescT>
                <TaskDesc>{props.descricao}</TaskDesc>
            </Modal>
        </View>
    )
}