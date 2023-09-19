import { View } from "react-native"
import { CardTask, Modal, StatusColor, TaskDesc, TaskDescT, TaskName, TaskTitle, ViewCard, ViewData, ViewIcons } from "./styled"
import { Badge, Icon, Overlay, SpeedDial, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { ICards } from "../../interfaces/cards";
import React from "react";
import Input from "../input/input";
import { DropdownComponent } from "../dropdown/dropdown";
import { DatePicker } from "../datepicker";

const priority = [
    { label: 'Alta', value: 'High' },
    { label: 'Média', value: 'Medium' },
    { label: 'Baixa', value: 'Low' }
];

export const Cards = (props: ICards) => {
    const [visible, setVisible] = useState(false);

    const [date, setDate] = useState(props.deadline)    

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [edit, setEdit] = useState(false);

    return edit ? (
        <View>
            <TouchableOpacity onPress={toggleOverlay}>
                <CardTask>
                    <StatusColor style={{ backgroundColor: props.statusColor }}></StatusColor>
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
                            containerStyle={{ position: 'absolute', top: 6, left: 170 }}
                        />
                    </View>

                    <ViewIcons>
                        <Icon
                            onPress={() => setEdit(!edit)}
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

                <TaskDescT>Prioridade: </TaskDescT>
                <DropdownComponent
                    placeholder={props.priority}
                    data={priority}
                    iconSelectedName='star'
                    iconName='staro'
                    onChange={(selectedItem) => {
                        if (selectedItem === "High" || selectedItem === "Medium" || selectedItem === "Low") {
                            /* setData({ ...data, priority: selectedItem }); */
                        } else {
                            console.error("Invalid property value: ", selectedItem);
                        }
                    }}
                />

                <ViewData>
                    <TaskDescT>Expira em: </TaskDescT>
                    <TaskDesc>Data atual: {props.deadline}</TaskDesc>
                    <DatePicker
                        onDateChange={(date) => {setDate(date)}}
                        style={{ width: 330, color: 'black', }}
                        iconNameL='calendar-o'
                        iconColorL='black'
                        iconColorR='grey'
                        iconNameR='angle-down'
                        color="black"
                        title="Data de expiração"
                        value={date}
                    />
                </ViewData>

                <TaskDescT>Descrição:</TaskDescT>
                <Input
                    placeholder={props.descricao}
                    onChange={() => {}}
                />
            </Modal>
        </View>) :
        (<View>
            <TouchableOpacity onPress={toggleOverlay}>
                <CardTask>
                    <StatusColor style={{ backgroundColor: props.statusColor }}></StatusColor>
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
                            containerStyle={{ position: 'absolute', top: 6, left: 170 }}
                        />
                    </View>

                    <ViewIcons>
                        <Icon
                            onPress={() => setEdit(!edit)}
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

                <TaskDescT>Prioridade: {props.priority}</TaskDescT>

                <ViewData>
                    <TaskDescT>Expira em: {props.deadline}</TaskDescT>
                </ViewData>

                <TaskDescT>Descrição:</TaskDescT>
                <TaskDesc>{props.descricao}</TaskDesc>
            </Modal>
        </View>
        )
}