import { CardTask, GeneralView, InputView, Modal, StatusColor, TaskDesc, TaskDescT, TaskName, TaskTitle, ViewCard, ViewData, ViewIcon, ViewIcons, ViewName } from './styled'
import { DropdownComponent } from '../dropdown/dropdown';
import { IUpdateTask } from "../../interfaces/task";
import { decodeJsonWebToken } from "../../utils/utils";
import { TouchableOpacity } from 'react-native';
import { ICards } from '../../interfaces/cards';
import serviceTask from "../../service/task";
import { useEffect, useState } from 'react';
import { DatePicker } from '../datepicker';
import { useAuth } from "../../hooks/auth";
import React, { View } from 'react-native'
import { Priority } from './priorities';
import { Icon } from '@rneui/themed';
import Input from '../input/input';

const priority = [
    { label: 'Alta', value: 'High' },
    { label: 'Média', value: 'Medium' },
    { label: 'Baixa', value: 'Low' }
];

const stts = [
    { label: 'A Fazer', value: 'TO DO' },
    { label: 'Em Progresso', value: 'DOING' },
    { label: 'Concluído', value: 'DONE' }
]

export const Cards = (props: ICards) => {
    const { userToken } = useAuth()

    const { id } = decodeJsonWebToken(String(userToken))

    const [name, setName] = useState(props.task);

    const [description, setDescription] = useState(props.descricao);

    const [visible, setVisible] = useState(false);

    const [priorities, setPriorities] = useState<string | undefined>(undefined);

    const [status, setStatus] = useState<string | undefined>(undefined);

    const [data, setData] = useState({} as IUpdateTask)

    const [date, setDate] = useState(props.deadline)

    const [edit, setEdit] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible)
    };

    const handleDelete = async () => {
        try {
            await serviceTask.deleteTask(props.id)

            setVisible(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (data: IUpdateTask) => {
        try {
            if (data) {
                await serviceTask.updateTask({
                    name: name,
                    description: description,
                    priority: data?.priority || props.priority,
                    deadline: date,
                    status: data?.status,
                    userId: id,
                    id: props.id,
                    timeSpent: 0,
                    done: false
                })
            }

            setEdit(!edit)
        }
        catch (error) {
            console.error(error)
        }
    }

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
                        <ViewName>
                            <TaskTitle>{props.task}</TaskTitle>
                        </ViewName>

                        <ViewIcons>
                            <ViewIcon>
                                <Icon
                                    onPress={() => handleSubmit(data)}
                                    name='check'
                                    color='#000'
                                    size={30}
                                />
                                <Icon
                                    onPress={() => { setVisible(false); setEdit(!edit) }}
                                    name='close'
                                    color='#000'
                                    size={30}
                                />
                            </ViewIcon>
                        </ViewIcons>
                    </ViewCard>

                    <TaskDescT>Nome:</TaskDescT>
                    <InputView>
                        <Input
                            placeholder={''}
                            value={name}
                            onChange={(e) => { setName(e.nativeEvent.text) }}
                            textColor='#000'
                            color='#C74634'
                            iconL='file-text-o'
                        />
                    </InputView>

                    <TaskDescT>Status: </TaskDescT>
                    <DropdownComponent
                        placeholder={props.value}
                        width={300}
                        data={stts}
                        value={priorities}
                        onValueChange={(selectedItem) => {
                            setData({ ...data, status: selectedItem })
                        }}
                        iconColor='#C74634'
                        iconSelectedName='tags'
                        iconName='tagso'
                    />

                    <TaskDescT>Prioridade: </TaskDescT>
                    <DropdownComponent
                        placeholder={
                            props.priority === 'High' ? 'Alta'
                                : props.priority === 'Medium' ? 'Média'
                                    : props.priority === 'Low' ? 'Baixa'
                                        : 'Selecione uma prioridade'
                        }
                        width={300}
                        data={priority}
                        value={priorities}
                        onValueChange={(selectedItem) => {
                            setData({ ...data, priority: selectedItem })
                        }}
                        iconSelectedName='star'
                        iconColor='#C74634'
                        iconName='staro'
                    />

                    <ViewData>
                        <TaskDescT>Expira em: </TaskDescT>
                        <TaskDesc>Data atual: {props.deadline}</TaskDesc>
                        <DatePicker
                            onDateChange={(date) => { setDate(date); setData({ ...data, deadline: date }) }}
                            style={{ width: 300, color: 'black' }}
                            iconNameL='calendar-o'
                            iconColorL='#C74634'
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
                            placeholder={''}
                            value={description}
                            onChange={(e) => { setDescription(e.nativeEvent.text) }}
                            textColor='#000'
                            color='#C74634'
                            iconL='pencil-square-o'
                            multiline={true}
                            numberLines={4}
                            width={50}
                            height={80}
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
                        <ViewName>
                            <TaskTitle>{props.task}</TaskTitle>
                        </ViewName>

                        <ViewIcons>
                            <ViewIcon>
                                <Icon
                                    onPress={() => handleDelete()}
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

                    <Priority priority={props.priority} />

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