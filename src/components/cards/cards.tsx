import { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, Text, ScrollView, TextInputSubmitEditingEventData } from 'react-native';
import { calculateDateWithTime, checkProgressSubTask, decodeJsonWebToken } from "../../utils/utils";
import { ICreateSubtasks, IGetSubtasks } from '../../interfaces/subtask';
import { DropdownComponent } from '../dropdown/dropdown';
import { IUpdateTask } from "../../interfaces/task";
import serviceSubtask from '../../service/subtask';
import { ICards } from '../../interfaces/cards';
import { Checkbox } from '../checkbox/checkbox';
import serviceTask from "../../service/task";
import { TimerModal } from '../timecontroll';
import { useEffect, useState } from 'react';
import { DatePicker } from '../datepicker';
import { useAuth } from "../../hooks/auth";
import React, { View } from 'react-native';
import { ToastComponent } from '../toast';
import { Priority } from './priorities';
import { Divider } from '@rneui/base';
import { ViewScroll } from './styled';
import { Icon, ListItem } from '@rneui/themed';
import { IconModel } from '../icons';
import Input from '../input/input';
import * as S from './styled';
import { HidenMenu } from '../hidenmenu';
import { Options } from '../../interfaces/hidenmenu';
import * as M from "./styled";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import serviceUser from '../../service/user';
import { useTheme } from 'styled-components';


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
    const theme = useTheme()

    const { id } = decodeJsonWebToken(String(userToken))
 
    const [name, setName] = useState(props.task);

    const [description, setDescription] = useState(props.descricao);

    const [visible, setVisible] = useState(false);

    const [priorities, setPriorities] = useState<string | undefined>(undefined);

    const [customInterval, setCustomInterval] = useState(props.customInterval);

    const [data, setData] = useState({} as IUpdateTask)

    const [subtask, setSubtask] = useState<IGetSubtasks[]>([])

    const [date, setDate] = useState(props.deadline)

    const [edit, setEdit] = useState(false);

    const [reloadSubtasks, setReloadSubtasks] = useState(false);

    const [timer, setTimer] = useState(false)

    const [isInputVisible, setIsInputVisible] = useState(false);

    const [subtasks, setSubtasks] = useState<ICreateSubtasks>({} as ICreateSubtasks);

    const [reload, setReload] = useState(false);

    const [newSubtask, setNewSubtask] = useState('');

    const [subtaskName, setSubtaskName] = useState('' as string);

    const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);

    const [dateError, setDateError] = useState(false)

    const [users, setUsers] = useState<Array<{key: number, value: string}>>([]);

    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const [expanded, setExpanded] = useState(false);

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

    const handleEnterAddSubtask = (e: string) => {
        if (e) {
            const newSubtaskObject: ICreateSubtasks = {
                name: newSubtask,
                done: false,
                task: props.id
            };

            serviceSubtask.createSubtask(newSubtaskObject)
                .then(() => {
                    ToastComponent({ type: 'success', title: 'Subtarefa criada!' })
                    setReloadSubtasks(true);
                    setNewSubtask('');
                    setIsInputVisible(false);
                })
                .catch(error => {
                    console.error('Erro ao criar subtask:', error);
                });
        }
    }

    useEffect(() => {
        setReloadSubtasks(true)
        if (reloadSubtasks) {
            fetchTaskSubtasks()
                .then(() => {
                    setReloadSubtasks(false);
                })
                .catch(error => {
                    console.error('Erro ao carregar subtasks:', error);
                });
        }
    }, [props.id, reloadSubtasks]);

    useEffect(() => {
        if (data) {
            data.sharedUsersIds = selectedUsers;
        }
    }, [selectedUsers, data]);

    useEffect(() =>{
        
        async function fetchAllUsers() {
            try {
                const response = await serviceUser.getAllUsers();
                if (response) {
                    const users = response.data;
                    console.log(props.sharedUsersIds)
                    let notSharedUsers = users.filter((user: any) => !props.sharedUsersIds.includes(user.id.toString()))
                    let newArray = notSharedUsers.map((item: { id: any; email: any; }) => {
                        return { key: item.id, value: item.email }
                    })
                    setUsers(newArray);

                } else {
                    console.error("Erro ao buscar usuários");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllUsers();
    }, [])

    const handleAddSubtask = () => {
        setIsInputVisible(true);

        if (newSubtask) {
            const newSubtaskObject: ICreateSubtasks = {
                name: newSubtask,
                done: false,
                task: props.id
            };
            setSubtasks(newSubtaskObject);

            serviceSubtask.createSubtask(newSubtaskObject)

            setNewSubtask('');

            ToastComponent({ type: 'success', title: 'Subtarefa criada!' })

            setIsInputVisible(false);
            setReloadSubtasks(true);
        }

    };

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

            ToastComponent({ type: 'error', title: 'Tarefa deletada!' })

            setVisible(false)
            setReload(false);
            props.reloadTasksData();
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

    const handleSubtaskName = async (subtaskId: number, newName: string) => {
        try {
            
            await serviceSubtask.updateSubtaskName(subtaskId, newName)

            ToastComponent({ type: 'success', title: 'Subtarefa atualizada!' })

            setReloadSubtasks(true);
        } catch (error) {
            console.error("Erro ao atualizar o estado da subtarefa:", error)
        }
    };

    const handleCloseSubtask = () => {
        setNewSubtask('');

        setIsInputVisible(false);
    }

    const handleDeleteSubtask = async (subtaskId: number) => {
        try {
            await serviceSubtask.deleteSubtask(subtaskId)

            ToastComponent({ type: 'error', title: 'Subtarefa deletada!' })

            setReloadSubtasks(true);
        } catch (error) {
            console.error("Erro ao atualizar o estado da subtarefa:", error)
        }
    }

    const handleSubmit = async (data: IUpdateTask) => {
        try {
            if (data) {
                const currentDate = new Date();
                const deadlineDate = new Date(data.deadline);
                const deadlineProps = new Date(props.deadline);

                currentDate.setHours(0, 0, 0, 0);
                deadlineDate.setHours(0, 0, 0, 0);
                deadlineProps.setHours(0, 0, 0, 0);

                deadlineDate.setTime(deadlineDate.getTime() + 24 * 60 * 60 * 1000);
                deadlineProps.setTime(deadlineProps.getTime() + 24 * 60 * 60 * 1000);

                data.sharedUsersIds = selectedUsers;

                await serviceTask.updateTask(data);

                if (currentDate <= deadlineDate || isNaN(deadlineDate.getTime())) {
                    if (name != '' && description != '') {
                        await serviceTask.updateTask({
                            name: name,
                            description: description,
                            customInterval: data?.customInterval || props.customInterval,
                            priority: data?.priority || props.priority,
                            deadline: date,
                            status: data?.status || props.statusEnum,
                            userId: id,
                            id: props.id,
                            timeSpent: props.timeSpent,
                            done: false,
                            sharedUsersIds: selectedUsers  
                        })

                        ToastComponent({ type: 'success', title: 'Tarefa atualizada!' })

                        setEdit(false)

                        setDateError(false)
                        props.reloadTasksData();
                    }
                } else {
                    setDateError(true)
                }
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setReload(false);
        if (reload) props.reloadTasksData()
    }, [props, reload])

    const reloadTasksData = () => {
        setReload(!reload);
    };

    const ModalDeleteFuncition = () => {
        handleDelete()
        setEditingSubtaskId(null)
    }

    const ModalEditFunction = () => {
        setEdit(!edit);
        setEditingSubtaskId(null);
    }

    const ModalCloseFuncion = () => {
        setVisible(false);
        setEditingSubtaskId(null)
    }

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    const options: Options[] = [
        { color: "#bd1310", name: "trash-o", function: ModalDeleteFuncition, icon: "FontAwesome" },
        { color: "#000", name: "hourglass-o", function: toggleTimerModal, icon: "FontAwesome" },
        { color: "#000", name: "edit-2", function: ModalEditFunction, icon: "Feather" },
    ]

    return edit ? (
        <View>
            <TouchableOpacity onPress={toggleOverlay}>
                <S.CardTask>
                    <S.StatusColor style={{ backgroundColor: props.statusColor }}></S.StatusColor>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginRight: 15, marginLeft: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginLeft: 10 }}>

                            {new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() == new Date().toLocaleDateString() ? (
                                <View style={{ marginTop: 10 }}>
                                    <IconModel
                                        iconName={'exclamationcircleo'}
                                        icon={'AntDesign'}
                                        IconColor={'#FF4328'}
                                        IconSize={22}
                                    />
                                </View>
                            ) : null}

                            <S.TaskName style={{
                                color: new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() < new Date().toLocaleDateString() ? "#de0300"
                                    : new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() == new Date().toLocaleDateString() ? "#FF4328"
                                        : "black", fontWeight: "bold", fontSize: 18
                            }}>{props.task}</S.TaskName>
                        </View>

                        <S.TaskName style={{
                            color: new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() < new Date().toLocaleDateString() ? "#de0300"
                                : new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() == new Date().toLocaleDateString() ? "#FF4328"
                                    : "black", fontSize: 18
                        }}>{props.priority === "Low" ? "★" : props.priority === "Medium" ? "★★" : "★★★"}</S.TaskName>
                    </View>
                </S.CardTask>
            </TouchableOpacity>

            <S.Modal isVisible={visible} onBackdropPress={toggleOverlay} >
                <ViewScroll>
                    <S.GeneralView>
                        <S.ViewCard>
                            <S.ViewIcons>
                                <S.ViewIcon>
                                    <IconModel
                                        onPress={() => { handleSubmit(data) }}
                                        IconColor={"#000"}
                                        IconSize={26}
                                        icon='AntDesign'
                                        iconName='check'
                                    />

                                    <IconModel
                                        onPress={() => { setEdit(!edit), setDateError(false), setDate(props.deadline), setName(props.task), setDescription(props.descricao), setPriorities(props.priority) }}
                                        IconColor={"#000"}
                                        IconSize={25}
                                        icon='AntDesign'
                                        iconName='close'
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
                            <S.TaskDescT>Prazo:</S.TaskDescT>
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

                            {dateError && (
                                <Text style={{ color: 'red', fontSize: 14, marginTop: -10, marginBottom: 10 }}>A data não pode ser menor que o dia de hoje.</Text>
                            )}
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
                        {
                            props.customInterval > 0 ?
                                <>
                                    <S.TaskDescT>Frequência em dias:</S.TaskDescT>
                                    <S.InputView>
                                        <Input
                                            value={customInterval.toString()}
                                            placeholder={'Insira a frequência em dias'}
                                            textColor='#000'
                                            color='#C74634'
                                            onChange={(e) => { setCustomInterval(Number(e.nativeEvent.text)); setData({ ...data, customInterval: Number(e.nativeEvent.text) }) }}
                                            iconL='repeat'
                                        />
                                    </S.InputView>
                                </>
                                : null
                        }

                        <S.InputView>
                            <M.MultiView>
                                <M.MultiCont>
                                    <MultipleSelectList
                                        setSelected={(val: number[]) => {  
                                            setSelectedUsers(val);
                                        }}
                                        data={users}
                                        save="key"
                                        value={selectedUsers}
                                        selected = {selectedUsers}
                                        label="Compartilhar tarefa com"
                                        notFoundText='Usuário não encontrado'
                                        fontFamily="theme.FONTS.Poppins_400Regular"
                                        labelStyles={{
                                            fontFamily: theme.FONTS.Poppins_400Regular,
                                            fontSize: 18
                                        }}
                                        badgeStyles={{backgroundColor: "#de0300"}}
                                        badgeTextStyles={{fontFamily: theme.FONTS.Poppins_500Medium,}}
                                        itemStyles={{ fontFamily: theme.FONTS.Poppins_400Regular, fontSize: 16 }}
                                        placeholder='Selecionar usuários para compartilhar'
                                        dropdownTextStyles = {{ fontFamily: theme.FONTS.Poppins_400Regular, fontSize: 15 }}
                                    />
                                </M.MultiCont>
                            </M.MultiView>

                        </S.InputView>

                    </S.GeneralView>
                </ViewScroll>
            </S.Modal>
        </View>) :
        (<View>
            <TouchableOpacity onPress={toggleOverlay}>
                <S.CardTask>
                    <S.StatusColor style={{ backgroundColor: props.statusColor }}></S.StatusColor>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginRight: 15, marginLeft: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginLeft: 10 }}>

                            {new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() == new Date().toLocaleDateString() && props.value != 'Concluído' ? (
                                <View style={{ marginTop: 10 }}>
                                    <IconModel
                                        iconName={'exclamationcircleo'}
                                        icon={'AntDesign'}
                                        IconColor={'#FF4328'}
                                        IconSize={22}
                                    />
                                </View>
                            ) : null}

                            <S.TaskName style={{
                                color: new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() < new Date().toLocaleDateString() && props.value != 'Concluído' ? "#de0300"
                                    : new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() == new Date().toLocaleDateString() && props.value != 'Concluído' ? "#FF4328"
                                        : "black", fontWeight: "bold", fontSize: 18
                            }}>{props.task}</S.TaskName>
                        </View>

                        <S.TaskName style={{
                            color: new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() < new Date().toLocaleDateString() && props.value != 'Concluído' ? "#de0300"
                                : new Date(new Date(props.deadline).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() == new Date().toLocaleDateString() && props.value != 'Concluído' ? "#FF4328"
                                    : "black", fontSize: 18
                        }}>{props.priority === "Low" ? "★" : props.priority === "Medium" ? "★★" : "★★★"}</S.TaskName>
                    </View>
                </S.CardTask>
            </TouchableOpacity>

            <TimerModal
                view={timer}
                onBackdropPress={toggleTimerModal}
                task={{
                    id: props.id,
                    timeSpent: props.timeSpent,
                    name: props.task
                }}
                reloadTasksData={reloadTasksData}
            />

            <S.ModalPadrao isVisible={visible} onBackdropPress={toggleOverlay}>
                    <S.GeneralView>
                        <S.ViewCard>
                            <S.ViewIcons>
                                <S.ViewIcon>
                                    {openModal ?
                                        <HidenMenu option={options} open={handleOpenModal} /> :
                                        <IconModel
                                            onPress={() => handleOpenModal()}
                                            IconColor={"#000"}
                                            IconSize={26}
                                            icon='FontAwesome'
                                            iconName='ellipsis-h'
                                        />
                                    }
                                    <IconModel
                                        onPress={ModalCloseFuncion}
                                        IconColor={"#000"}
                                        IconSize={25}
                                        icon='AntDesign'
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
                        </S.ViewData>
                        <Divider />
                        <S.ViewComp>
                            <ListItem.Accordion
                                content={
                                    <S.TaskDescT>Compartilhado com:</S.TaskDescT>
                                }
                                isExpanded={expanded}
                                onPress={() => {
                                    setExpanded(!expanded);
                                }}
                            >
                                {props.users?.map(userId => (
                                    <ListItem key={userId.id} style={{marginTop: -20 }}>
                                        <ListItem.Title>
                                            <S.TaskComp>{userId.name} - {userId.email}</S.TaskComp>
                                        </ListItem.Title>
                                    </ListItem>
                                ))}
                            </ListItem.Accordion>
                        </S.ViewComp>
                        <Divider />
                        <View style={{ height: 20 }}></View>
                    
                        <S.ViewData>
                            {subtask?.length === 0 ? (
                                <S.TaskDescT>Não há subtarefas</S.TaskDescT>
                            ) : (
                                <View>
                                    <S.TaskDescT>Subtarefas:</S.TaskDescT>
                                    <S.SubtaskDone style={{ marginTop: -10 }}>
                                        Total: {checkProgressSubTask(subtask).toFixed(2)}%
                                    </S.SubtaskDone>
                                    <ScrollView style={{ maxHeight: 200, width: 300 }}>
                                        {subtask &&
                                            subtask.map((item: IGetSubtasks) => (
                                                <View key={item.id} style={{ marginBottom: -20 }}>
                                                    {!editingSubtaskId || editingSubtaskId !== item.id ? (
                                                        <Checkbox
                                                            label={item.name}
                                                            check={item.done}
                                                            onCheck={() => handleCheck(item.id, !item.done)}
                                                            onLongPress={() => {
                                                                setEditingSubtaskId(item.id),
                                                                    setSubtaskName(item.name)
                                                            }}
                                                        />
                                                    ) : (
                                                        <S.InputView style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }}>
                                                            <TouchableOpacity
                                                                onPressOut={() => { setEditingSubtaskId(null), handleSubtaskName(item.id, subtaskName) }}
                                                                onLongPress={() => { setEditingSubtaskId(null), handleSubtaskName(item.id, subtaskName) }}
                                                                style={{ paddingVertical: 7, width: 300 }}
                                                            >
                                                                <Input
                                                                    placeholder={''}
                                                                    value={subtaskName}
                                                                    onChange={(e) => {
                                                                        setSubtaskName(e.nativeEvent.text);
                                                                    }}
                                                                    textColor="#000"
                                                                    color="#C74634"
                                                                    iconL="bookmark-o"
                                                                    height={5}
                                                                    fontSize={17}
                                                                />
                                                            </TouchableOpacity>
                                                            <View style={{ marginRight: 30, marginTop: 0, alignItems: 'flex-end' }}>
                                                                <IconModel
                                                                    onPress={() => { handleDeleteSubtask(item.id), setEditingSubtaskId(null) }}
                                                                    IconColor={"#bd1310"}
                                                                    IconSize={28}
                                                                    icon='FontAwesome'
                                                                    iconName='trash-o'
                                                                />
                                                            </View>
                                                        </S.InputView>
                                                    )}
                                                </View>
                                            ))}
                                    </ScrollView>
                                </View>
                            )}
                            {isInputVisible && (
                                <S.InputView style={{ marginTop: -10 }}>
                                    <Input
                                        placeholder="Insira a nova subtarefa"
                                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setNewSubtask(e.nativeEvent.text)}
                                        textColor='#000'
                                        value={newSubtask}
                                        onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => handleEnterAddSubtask(e.nativeEvent.text)}
                                        fontSize={17}
                                        height={5}
                                    />
                                </S.InputView>
                            )}
                            <TouchableOpacity onPress={handleAddSubtask} style={{ flexDirection: 'row', marginRight: 40, alignSelf: 'flex-end', marginTop: 10 }}>
                                {isInputVisible ? (
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <View style={{ paddingRight: 35 }}>
                                            <Icon
                                                name='close'
                                                color='#de0300'
                                                size={28}
                                                onPress={handleCloseSubtask}
                                            />
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0 }}>
                                            <Icon
                                                name='check'
                                                color='grey'
                                                size={26}
                                            />
                                            <Text style={{ color: 'grey', fontSize: 20, marginLeft: 10 }}>Confirmar subtarefa</Text>
                                        </View>
                                    </View>
                                ) :
                                    <>
                                        <Icon
                                            name='add'
                                            color='grey'
                                            size={26}
                                        />
                                        <Text style={{ color: 'grey', fontSize: 20, marginLeft: 5, marginBottom: 10 }}>Adicionar subtarefa</Text>
                                    </>
                                }
                            </TouchableOpacity>
                        </S.ViewData>
                    </S.GeneralView>
            </S.ModalPadrao>
        </View>
        )
}