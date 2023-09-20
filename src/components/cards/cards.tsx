import { View } from 'react-native'
import { CardTask, GeneralView, InputView, Modal, StatusColor, TaskDesc, TaskDescT, TaskName, TaskTitle, ViewCard, ViewData, ViewIcon, ViewIcons } from './styled'
import { Badge, Icon, Overlay, SpeedDial, Text } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ICards } from '../../interfaces/cards';
import React from 'react';
import Input from '../input/input';
import { DropdownComponent } from '../dropdown/dropdown';
import { DatePicker } from '../datepicker';

const priority = [
    { label: 'Alta', value: 'High' },
    { label: 'Média', value: 'Medium' },
    { label: 'Baixa', value: 'Low' }
];

const status = [
    { label: 'TO DO', value: 'TO DO' },
    { label: 'DOING', value: 'DOING' },
    { label: 'DONE', value: 'DONE' }
]

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
                <GeneralView>
                    <ViewCard>
                        <View>
                            <TaskTitle>{props.task}</TaskTitle>
                        </View>

                        <ViewIcons>
                            <ViewIcon>
                                <Icon
                                    onPress={() => setEdit(!edit)}
                                    name='check'
                                    color='#000'
                                    size={30}
                                />
                                <Icon
                                    onPress={() => setVisible(false)}
                                    name='close'
                                    color='#000'
                                    size={30}
                                />
                            </ViewIcon>
                        </ViewIcons>
                    </ViewCard>

                    <TaskDescT>Status: </TaskDescT>
                    <DropdownComponent
                        placeholder={props.value}
                        width={300}
                        data={status}
                        iconSelectedName='tags'
                        iconName='tagso'
                        onChange={(selectedItem) => {
                            if (selectedItem === 'High' || selectedItem === 'Medium' || selectedItem === 'Low') {
                                /* setData({ ...data, priority: selectedItem }); */
                            } else {
                                console.error('Invalid property value: ', selectedItem);
                            }
                        }}
                    />

                    <TaskDescT>Prioridade: </TaskDescT>
                    <DropdownComponent
                        placeholder={props.priority}
                        width={300}
                        data={priority}
                        iconSelectedName='star'
                        iconName='staro'
                        onChange={(selectedItem) => {
                            if (selectedItem === 'High' || selectedItem === 'Medium' || selectedItem === 'Low') {
                                /* setData({ ...data, priority: selectedItem }); */
                            } else {
                                console.error('Invalid property value: ', selectedItem);
                            }
                        }}
                    />

                    <ViewData>
                        <TaskDescT>Expira em: </TaskDescT>
                        <TaskDesc>Data atual: {props.deadline}</TaskDesc>
                        <DatePicker
                            onDateChange={(date) => { setDate(date) }}
                            style={{ width: 300, color: 'black' }}
                            iconNameL='calendar-o'
                            iconColorL='black'
                            iconColorR='grey'
                            iconNameR='angle-down'
                            color='black'
                            title='Data de expiração'
                            value={date}
                        />
                    </ViewData>

                    <TaskDescT>Descrição:</TaskDescT>
                    <InputView>
                        <Input
                            placeholder='Insira a descrição da tarefa'
                            onChange={(e) => {/* setData({ ...data, description: e.nativeEvent.text }) */ }}
                            textColor='#000'
                            color='black'
                            iconL='pencil-square-o'
                            multiline={true}
                            numberLines={4}
                            width={50}
                            height={100}
                        />
                    </InputView>
                </GeneralView>
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
                <GeneralView>
                    <ViewCard>
                        <View>
                            <TaskTitle>{props.task}</TaskTitle>
                        </View>

                        <ViewIcons>
                            <ViewIcon>
                                <Icon
                                    name='delete'
                                    color='#bd1310'
                                    size={30}
                                />
                                <Icon
                                    onPress={() => setEdit(!edit)}
                                    name='edit'
                                    color='#000'
                                    size={30}
                                />
                                <Icon
                                    onPress={() => setVisible(false)}
                                    name='close'
                                    color='#000'
                                    size={30}
                                />
                            </ViewIcon>
                        </ViewIcons>
                    </ViewCard>

                    <TaskDescT>Status: {props.value}</TaskDescT>

                    <TaskDescT>Prioridade: {props.priority}</TaskDescT>

                    <ViewData>
                        <TaskDescT>Expira em: {props.deadline}</TaskDescT>
                    </ViewData>

                    <ViewData>
                        <TaskDescT>Descrição:</TaskDescT>
                        <TaskDesc>{props.descricao}</TaskDesc>
                    </ViewData>
                </GeneralView>
            </Modal>
        </View>
        )
}