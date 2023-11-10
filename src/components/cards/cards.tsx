import React, { NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, Text, View, TextInputSubmitEditingEventData, ScrollView } from 'react-native';
import { calculateDateWithTime, checkProgressSubTask, decodeJsonWebToken } from "../../utils/utils";
import { ICreateSubtasks, IGetSubtasks } from '../../interfaces/subtask';
import { DropdownComponent } from '../dropdown/dropdown';
import { Options } from '../../interfaces/hidenmenu';
import { IUpdateTask } from "../../interfaces/task";
import serviceSubtask from '../../service/subtask';
import { ICards } from '../../interfaces/cards';
import { Checkbox } from '../checkbox/checkbox';
import { Icon, ListItem } from '@rneui/themed';
import { useTheme } from 'styled-components';
import serviceTask from "../../service/task";
import { TimerModal } from '../timecontroll';
import { UpdateModal } from '../updateModal';
import { CompModal } from '../compartilhado';
import { useEffect, useState } from 'react';
import { DatePicker } from '../datepicker';
import { useAuth } from "../../hooks/auth";
import { ToastComponent } from '../toast';
import { HidenMenu } from '../hidenmenu';
import { Priority } from './priorities';
import { Divider } from '@rneui/base';
import { ViewScroll } from './styled';
import { IconModel } from '../icons';
import Input from '../input/input';
import * as S from './styled';

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

    const [visibleC, setVisibleC] = useState(false);

    const [priorities, setPriorities] = useState<string | undefined>(undefined);

    const [customInterval, setCustomInterval] = useState(props.customInterval);

    const [data, setData] = useState({} as IUpdateTask)

    const [subtask, setSubtask] = useState<IGetSubtasks[]>([])

    const [date, setDate] = useState(props.deadline)

    const [edit, setEdit] = useState(false);

    const [compartilhar, setCompartilhar] = useState(false);

    const [reloadSubtasks, setReloadSubtasks] = useState(false);

    const [timer, setTimer] = useState(false)

    const [isInputVisible, setIsInputVisible] = useState(false);

    const [subtasks, setSubtasks] = useState<ICreateSubtasks>({} as ICreateSubtasks);

    const [reload, setReload] = useState(false);

    const [newSubtask, setNewSubtask] = useState('');

    const [subtaskName, setSubtaskName] = useState('' as string);

    const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);

    const [dateError, setDateError] = useState(false)

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

    const toggleCompModal = () => {
        setCompartilhar(!compartilhar)
        setVisibleC(!visibleC)
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

    const [updateModal, setUpdateModal] = useState(false)

    const handleOpenUpdateModal = () => {
        setUpdateModal(!updateModal)
    }


    const options: Options[] = [
        { color: "#bd1310", name: "trash-o", size: 27, function: ModalDeleteFuncition, icon: "FontAwesome" },
        { color: "#000", name: "history", size: 30, function: handleOpenUpdateModal, icon: "MaterialIcons" },
        { color: "#000", name: "hourglass-o", size: 23, function: toggleTimerModal, icon: "FontAwesome" },
        { color: "#000", name: "edit-2", size: 23, function: ModalEditFunction, icon: "Feather" },
        { color: "#000", name: "users", size: 23, function: toggleCompModal, icon: "Feather" },
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
                                        : "black", fontSize: 18, fontFamily: theme.FONTS.Poppins_600SemiBold,
                            }}>{props.priority === "Low" ? "★" : props.priority === "Medium" ? "★★" : "★★★"}</S.TaskName>
                        </View>
                    </View>
                </S.CardTask>
            </TouchableOpacity>
            <S.Modal isVisible={visible} onBackdropPress={toggleOverlay} >
                <ViewScroll>
                    <S.GeneralView>
                        <S.ViewCard>
                            <S.ViewIcons>
                                <S.ViewIcon >
                                    <IconModel
                                        onPress={() => { handleSubmit(data) }}
                                        IconColor={"#000"}
                                        IconSize={26}
                                        icon='AntDesign'
                                        iconName='check'
                                    />
                                    <View >
                                        <IconModel
                                            onPress={() => { setEdit(!edit), setDateError(false), setDate(props.deadline), setName(props.task), setDescription(props.descricao), setPriorities(props.priority) }}
                                            IconColor={"#000"}
                                            IconSize={25}
                                            icon='AntDesign'
                                            iconName='close'
                                        />
                                    </View>
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
                            showIcon={true}
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
                            showIcon={true}
                        />
                        {
                            props.customInterval <= 0 ?
                                <>
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
                                </>
                                : null
                        }
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
                    </S.GeneralView>
                </ViewScroll>
            </S.Modal>
        </View>) : (<View>
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
                                        : "black", fontFamily: theme.FONTS.Poppins_600SemiBold, fontSize: 18
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

            {updateModal ?
                <UpdateModal id={props.id} view={updateModal} onBackdropPress={handleOpenUpdateModal} />
                :
                <></>
            }

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

            <CompModal
                view={compartilhar}
                onBackdropPress={toggleCompModal}
                reloadTasksData={reloadTasksData}
                taskid={props.id}
                userids={props.users}
            />

            <S.ModalPadrao isVisible={visible} onBackdropPress={toggleOverlay}>
                <S.GeneralView style={{ maxHeight: 500 }}>
                    <ScrollView>
                        <S.ViewCard>
                            <S.ViewIcons>
                                <S.ViewIcon>
                                    {openModal ? (
                                            <HidenMenu option={options} open={handleOpenModal} />
                                        ) : (
                                            options.map((option: any, index: any) => (
                                                option.name === "trash-o" && props.userId !== id || option.name === "users" && props.userId !== id ? null : (
                                                    <IconModel
                                                        key={index}
                                                        onPress={option.function} 
                                                        IconColor={option.color}
                                                        IconSize={option.size}
                                                        icon={option.icon}
                                                        iconName={option.name}
                                                    />
                                                )
                                            ))
                                        )}
                                    <IconModel
                                        style={{ marginTop: 3 }}
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
                        {
                            props.users?.length > 0 ?
                                <>
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
                                                <ListItem key={userId.id} style={{ marginTop: -20 }}>
                                                    <ListItem.Title>
                                                        <S.TaskComp>{userId.name} - {userId.email}</S.TaskComp>
                                                    </ListItem.Title>
                                                </ListItem>
                                            ))}
                                        </ListItem.Accordion>
                                    </S.ViewComp>
                                </> : null
                        }
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
                                            <Text style={{ color: 'grey', fontSize: 20, marginLeft: 10, fontFamily: theme.FONTS.Poppins_400Regular }}>Confirmar subtarefa</Text>
                                        </View>
                                    </View>
                                ) :
                                    <>
                                        <Icon
                                            name='add'
                                            color='grey'
                                            size={26}
                                        />
                                        <Text style={{ color: 'grey', fontSize: 20, marginLeft: 5, marginBottom: 10, fontFamily: theme.FONTS.Poppins_400Regular }}>Adicionar subtarefa</Text>
                                    </>
                                }
                            </TouchableOpacity>
                        </S.ViewData>
                    </ScrollView>

                </S.GeneralView>
            </S.ModalPadrao>

        </View>
    )
}