import { DropdownComponent } from '../../components/dropdown/dropdown';
import { decodeJsonWebToken, formatDate } from '../../utils/utils';
import { ButtonContainer, Container, ErrorText, ViewScroll } from './styled';
import { IResponseCadastro } from '../../interfaces/functions';
import { HeaderComponent } from '../../components/header';
import { useNavigation } from "@react-navigation/native";
import { DatePicker } from '../../components/datepicker';
import { Button } from '../../components/button/button';
import { ICreateTasks } from '../../interfaces/task';
import Input from '../../components/input/input';
import serviceTask from '../../service/task';
import { useAuth } from '../../hooks/auth';
import { View, Text } from 'react-native';
import React, { useState } from 'react';

const priority = [
    { label: 'Alta', value: 'High' },
    { label: 'Média', value: 'Medium' },
    { label: 'Baixa', value: 'Low' }
];

export default function CreateTask() {
    const navigate = useNavigation()

    const { userToken } = useAuth();

    const { id } = decodeJsonWebToken(String(userToken))

    const [priorities, setPriorities] = useState<string | undefined>(undefined);

    const [data, setData] = useState<ICreateTasks>({
        name: '',
        description: '',
        priority: 'Low',
        deadline: '' /* Date */,
        status: 'TO DO',
        timeSpent: 0,
        done: false,
        userId: id,
    })

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        description: "",
        deadline: ""
    })

    const [errorStatus, setErrorStatus] = useState({
        name: false,
        description: false,
        deadline: false
    })

    const handleCancel = () => {
        console.log(priorities)
        setPriorities(undefined)
        setData({
            name: '',
            description: '',
            priority: 'Low',
            deadline: '' /* Date */,
            status: 'TO DO',
            timeSpent: 0,
            done: false,
            userId: id,
        })
    }

    const checkFields = (values: ICreateTasks): boolean => {
        const newErrorStatus = {
            name: values.name === '',
            description: values.description === '',
            deadline: values.deadline === '',
        };

        setErrorStatus(newErrorStatus);

        return newErrorStatus.name || newErrorStatus.description || newErrorStatus.deadline;
    };

    const [prio, setPrio] = useState(false)

    const handleSubmit = async (data: ICreateTasks) => {
        console.log(data);
        
        try {
            if (checkFields(data)) {
                setErrorMessage({ name: "Nome é obrigatório", description: "Descrição é obrigatória", deadline: "Data é obrigatória" })

                if (!data.priority) {
                    setPrio(true)
                }
                else if (data.priority) {
                    setPrio(false)
                }
                return
            }
            else if (data.deadline <= formatDate(new Date())) {
                setErrorMessage({ name: "", description: "", deadline: "Data inválida. Selecione uma data futura." })
                return
            }
            else {
                setErrorMessage({ name: "", description: "", deadline: "" })
                const insertTask: IResponseCadastro | undefined = await serviceTask.createTask(data)
                if (insertTask?.validacao) {
                    setData({
                        name: '',
                        description: '',
                        priority: 'Low',
                        deadline: '' /* Date */,
                        status: 'TO DO',
                        timeSpent: 0,
                        done: false,
                        userId: id,
                    })
                    navigate.navigate("Tabs", { screen: "ToDo" })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <View style={{ backgroundColor: '#393939', paddingBottom: 20 }}><HeaderComponent /></View>
            <Container>
                <ViewScroll>
                    <Input
                        placeholder='Insira o nome da tarefa'
                        onChange={(e) => setData({ ...data, name: e.nativeEvent.text })}
                        errorMsg={errorStatus.name ? "Nome é obrigatório" : ""}
                        errorStyle={{ marginLeft: 30, color: "#F2F2F2", fontSize: 15 }}
                        color='#de0300'
                        textColor='#fff'
                        iconL='file-text-o'
                        value={data.name}
                    />

                    <Input
                        placeholder='Insira a descrição da tarefa'
                        onChange={(e) => setData({ ...data, description: e.nativeEvent.text })}
                        errorMsg={errorStatus.description ? "Descrição é obrigatória" : ""}
                        color='#de0300'
                        textColor='#fff'
                        errorStyle={{ marginLeft: 30, color: "#F2F2F2", fontSize: 15}}
                        iconL='pencil-square-o'
                        multiline={true}
                        value={data.description}
                        numberLines={4}
                        height={80}
                    />

                    <View style={{ marginLeft: 30, marginTop: 10 }}>
                        <DropdownComponent
                            placeholder={'Selecione a prioridade'}
                            data={priority}
                            value={priorities}
                            onValueChange={(selectedItem) => {
                                setData({ ...data, priority: selectedItem })
                            }}
                            borderColor='#9a9999'
                            color='#fff'
                            iconSelectedName='star'
                            iconName='staro'
                            iconColor='#de0300'
                            iconSize={28}
                            width={335}
                        />

                        {prio ? <ErrorText>Prioridade é obrigatória</ErrorText> : null}

                        <DatePicker
                            title='Selecione o prazo da tarefa'
                            onDateChange={(date) => { setData({ ...data, deadline: date }) }}
                            iconNameL='calendar-o'
                            iconColorL='#de0300'
                            iconColorR='grey'
                            iconNameR='angle-down'
                            errorMessage={errorMessage.deadline}
                            errorStyle={{ color: "#F2F2F2", marginLeft: -1, marginTop: 15, fontSize: 15 }}
                            value={data.deadline}
                            style={{ width: 330, height: 50, marginBottom: 40, marginTop: 10, marginLeft: 3 }}
                        />
                    </View>

                    {/* <Input
                placeholder='Insira a recorrência da tarefa'
                onChange={() => console.log('oi')}
                color='#C74634'
                textColor='#fff'
                iconL='refresh'
            />

            <Input
            placeholder='Insira com quem compartilhar'
            onChange={() => console.log('oi')}
                color='#C74634'
                textColor='#fff'
                iconL='user-o'
            /> */}

                    <ButtonContainer>
                        <Button
                            title='Criar tarefa'
                            borderColor='#de0300'
                            backgroundColor='#de0300'
                            type='solid'
                            onPress={() => handleSubmit(data)}
                        />

                        <Button
                            title='Cancelar'
                            width={120}
                            borderColor='white'
                            type='outline'
                            onPress={handleCancel}
                        />
                    </ButtonContainer>
                </ViewScroll>
            </Container>
        </>
    )
}