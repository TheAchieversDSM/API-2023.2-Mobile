import { IGetSubtasks } from '../../interfaces/subtask';
import { DropdownComponent } from '../dropdown/dropdown';
import { calculateDateWithTime, decodeJsonWebToken } from "../../utils/utils";
import { IUpdateTask } from "../../interfaces/task";
import serviceSubtask from '../../service/subtask';
import { TouchableOpacity } from 'react-native';
import { ICards } from '../../interfaces/cards';
import { Checkbox } from '../checkbox/checkbox';
import serviceTask from "../../service/task";
import { useEffect, useState } from 'react';
import { DatePicker } from '../datepicker';
import { useAuth } from "../../hooks/auth";
import React, { View } from 'react-native';
import { Priority } from './priorities';
import { Divider } from '@rneui/base';
import { ViewScroll } from './styled';
import { Icon } from '@rneui/themed';
import Input from '../input/input';
import * as S from './styled';
import { IconModel } from '../icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TimerModal } from '../timecontroll';


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

    const [data, setData] = useState({} as IUpdateTask)

    const [subtask, setSubtask] = useState<IGetSubtasks[]>([])

    const [date, setDate] = useState(props.deadline)

    const [edit, setEdit] = useState(false);

    const [reloadSubtasks, setReloadSubtasks] = useState(false);
    const [timer, setTimer] = useState(false)

    const toggleOverlay = () => {
        setVisible(!visible)
    };

    const toggleTimerModal = () => {
        setTimer(!timer)
        setVisible(!visible)
    }

    const handleDelete = async () => {
        try {
            await serviceTask.deleteTask(props.id)
            setVisible(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleCheck = async (subtaskId: number, newCheck: boolean) => {
        try {
            await serviceSubtask.updateSubtaskStatus(subtaskId, newCheck)

            setReloadSubtasks(true);
        } catch (error) {
            console.error("Erro ao atualizar o estado da subtarefa:", error)
        }
    };

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
                    timeSpent: props.timeSpent,
                    done: false
                })
            }
            setEdit(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function fetchTaskSubtasks() {
            try {
                const response = await serviceSubtask.getTaskSubtask(props.id);
                if (response) {
                    setSubtask(response.data)

                    return response.data;
                } else {
                    console.error("Erro ao buscar subtarefas da tarefa");
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (reloadSubtasks) {
            fetchTaskSubtasks();
            setReloadSubtasks(false);
        }

        fetchTaskSubtasks();
    }, [props.id, reloadSubtasks])

    return edit ? (
        <View>
            <TouchableOpacity onPress={toggleOverlay}>
                <S.CardTask>
                    <S.StatusColor style={{ backgroundColor: props.statusColor }}></S.StatusColor>
                    <S.TaskName>{props.task}</S.TaskName>
                </S.CardTask>
            </TouchableOpacity>

            <S.Modal isVisible={visible} onBackdropPress={toggleOverlay}>
                <ViewScroll>
                    <S.GeneralView>
                        <S.ViewCard>
                            <S.ViewIcons>
                                <S.ViewIcon>
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
                                </S.ViewIcon>
                            </S.ViewIcons>
                            <S.ViewName>
                                <S.TaskTitle>{props.task}</S.TaskTitle>
                            </S.ViewName>
                        </S.ViewCard>

                        <S.TaskDescT>Nome:</S.TaskDescT>
                        <S.InputView>
                            <Input
                                placeholder={''}
                                value={name}
                                onChange={(e) => { setName(e.nativeEvent.text) }}
                                textColor='#000'
                                color='#C74634'
                                iconL='file-text-o'
                            />
                        </S.InputView>

                        <S.TaskDescT>Status: </S.TaskDescT>
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

                        <S.TaskDescT>Prioridade: </S.TaskDescT>
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

                        <S.ViewData>
                            <S.TaskDesc>Data atual: {props.deadline}</S.TaskDesc>
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
                        </S.ViewData>

                        <S.TaskDescT>Descrição:</S.TaskDescT>
                        <S.InputView>
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
                        </S.InputView>
                    </S.GeneralView>
                </ViewScroll>
            </S.Modal>
        </View>) :
        (<View>
            <TouchableOpacity onPress={toggleOverlay}>
                <S.CardTask>
                    <S.StatusColor style={{ backgroundColor: props.statusColor }}></S.StatusColor>
                    <S.TaskName>{props.task}</S.TaskName>
                </S.CardTask>
            </TouchableOpacity>

            <TimerModal
                view={timer}
                onBackdropPress={toggleTimerModal}
                task={{
                    ...props,
                    userId: id,
                    description: props.descricao,
                    name: props.task,
                    status: props.taskStatus,
                    done: false /* @REVIEW */
                }}
            />

            <S.Modal isVisible={visible} onBackdropPress={toggleOverlay}>
                <S.GeneralView>
                    <S.ViewCard>
                        <S.ViewIcons>
                            <S.ViewIcon>
                                <IconModel
                                    onPress={() => handleDelete()}
                                    IconColor={"#bd1310"}
                                    IconSize={24}
                                    icon='FontAwesome'
                                    iconName='trash'
                                />
                                <IconModel
                                    onPress={toggleTimerModal}
                                    IconColor={"#000"}
                                    IconSize={24}
                                    icon={"AntDesign"}
                                    iconName={"hourglass"}
                                />
                                <IconModel
                                    onPress={() => setEdit(!edit)}
                                    IconColor={"#000"}
                                    IconSize={24}
                                    icon='MaterialIcons'
                                    iconName='edit'
                                />
                                <IconModel
                                    onPress={() => setVisible(false)}
                                    IconColor={"#000"}
                                    IconSize={24}
                                    icon='FontAwesome'
                                    iconName='close'
                                />
                            </S.ViewIcon>
                        </S.ViewIcons>
                        <S.ViewName>
                            <S.TaskTitle>{props.task}</S.TaskTitle>
                        </S.ViewName>
                    </S.ViewCard>

                    <S.TaskDescT>Tempo Gasto: {calculateDateWithTime(props.timeSpent)}</S.TaskDescT>

                    <S.TaskDescT>Status: {props.value}</S.TaskDescT>

                    <Priority priority={props.priority} />

                    <S.ViewData>
                        <S.TaskDescT>Expira em: {props.deadline}</S.TaskDescT>
                    </S.ViewData>

                    <S.ViewData>
                        <S.TaskDescT>Descrição:</S.TaskDescT>
                        <S.TaskDescT>{props.descricao}</S.TaskDescT>

                        <Divider />
                        <View style={{ height: 20 }}></View>

                        {subtask?.length === 0 ? <S.TaskDescT>Não há subtarefas</S.TaskDescT> :
                            <View>
                                <S.TaskDescT>Subtarefas:</S.TaskDescT>

                                {subtask && subtask?.map((item: IGetSubtasks) => (
                                    <View key={item.id}>
                                        <Checkbox
                                            label={item.name}
                                            check={item.done}
                                            onCheck={() => handleCheck(item.id, !item.done)}
                                        />
                                    </View>
                                ))}
                            </View>
                        }

                    </S.ViewData>
                </S.GeneralView>
            </S.Modal>
        </View>
        )
}