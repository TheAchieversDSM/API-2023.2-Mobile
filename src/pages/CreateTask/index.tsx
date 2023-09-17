import { DropdownComponent } from '../../components/dropdown/dropdown';
import { useNavigation } from "@react-navigation/native";
import { DatePicker } from '../../components/datepicker';
import { Button } from '../../components/button/button';
import { decodeJsonWebToken } from '../../utils/utils';
import { ButtonContainer, Container } from './styled';
import { ICreateTasks } from '../../interfaces/task';
import Input from '../../components/input/input';
import serviceTask from '../../service/task';
import { useAuth } from '../../hooks/auth';
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

    const checkFields = (values: ICreateTasks): boolean => {
        const newErrorStatus = {
            name: values.name === '',
            description: values.description === '',
            deadline: values.deadline === '',
        };

        setErrorStatus(newErrorStatus);

        return newErrorStatus.name || newErrorStatus.description || newErrorStatus.deadline;
    };

    const handleSubmit = async (data: ICreateTasks) => {
        try {
            if (checkFields(data)) {
                return
            } else {
                setErrorMessage({ name: "", description: "", deadline: "" })

                await serviceTask.createTask(data);
                
                navigate.navigate("Home")

                setErrorMessage({ name: "", description: "", deadline: "" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Input
                placeholder='Insira o nome da tarefa'
                onChange={(e) => setData({ ...data, name: e.nativeEvent.text })}
                errorMsg={errorStatus.name ? "Nome é obrigatório" : ""}
                color='#C74634'
                textColor='#fff'
                iconL='file-text-o'
            />

            <Input
                placeholder='Insira a descrição da tarefa'
                onChange={(e) => setData({ ...data, description: e.nativeEvent.text })}
                errorMsg={errorStatus.description ? "Descrição é obrigatória" : ""}
                color='#C74634'
                textColor='#fff'
                iconL='pencil-square-o'
            />

            <DropdownComponent
                placeholder={'Selecione a prioridade'}
                data={priority}
                onChange={(selectedItem) => {
                    if (selectedItem === "High" || selectedItem === "Medium" || selectedItem === "Low") {
                        setData({ ...data, priority: selectedItem });
                    } else {
                        console.error("Invalid property value: ", selectedItem);
                    }
                }}
                borderColor='#9a9999'
                color='#fff'
                iconSelectedName='star'
                iconName='staro'
                iconColor='#C74634'
                iconSize={28}
                width={335}
            />

            {/* Datepicker  */}
            <DatePicker
                title='Selecione o prazo da tarefa'
                onDateChange={(date) => { setData({ ...data, deadline: date }) }}
                iconNameL='calendar-o'
                iconColorL='#C74634'
                iconColorR='grey'
                iconNameR='angle-down'
                value={data.deadline}
                style={{ width: 335, height: 50, marginBottom: 20 }}
            />

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
                    borderColor='#C74634'
                    backgroundColor='#C74634'
                    type='solid'
                    onPress={() => handleSubmit(data)}
                />

                <Button
                    title='Cancelar'
                    width={120}
                    borderColor='white'
                    type='outline'
                    onPress={() => navigate.navigate("Home")}
                />
            </ButtonContainer>
        </Container>
    )
}