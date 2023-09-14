import { DropdownComponent } from '../../components/dropdown/dropdown';
import { Button } from '../../components/button/button';
import { ButtonContainer, Container } from './styled';
import Input from '../../components/input/input';

const priority = [
    { label: 'Alta', value: 'high' },
    { label: 'Média', value: 'medium' },
    { label: 'Baixa', value: 'low' }
];

export default function CreateTask() {
    return (
        <Container>
            <Input
                placeholder='Insira o nome da tarefa'
                onChange={() => console.log('oi')}
                color='#C74634'
                textColor='#fff'
                iconL='list-ul'
            />

            <Input
                placeholder='Insira a descrição da tarefa'
                onChange={() => console.log('oi')}
                color='#C74634'
                textColor='#fff'
                iconL='file-text-o'
            />

            <DropdownComponent
                placeholder={'Selecione a prioridade'}
                data={priority}
                onChange={() => console.log('oi')}
                onChangeText={() => console.log('oi')}
                borderColor='#9a9999'
                color='#fff'
                iconName='staro'
                iconColor='#C74634'
                iconSize={25}
                width={335}
            />

            <Input
                placeholder='Insira o prazo da tarefa'
                onChange={() => console.log('oi')}
                color='#C74634'
                textColor='#fff'
                iconL='calendar-o'
            />

            {/* Datepicker  */}
            {/* <Input
                placeholder='Insira o prazo da tarefa'
                onChange={() => console.log('oi')}
                color='#C74634'
                textColor='#fff'
                iconL='hourglass-o'
            /> */}

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
                    onPress={() => console.log('oi')}
                />

                <Button
                    title='Cancelar'
                    width={120}
                    borderColor='white'
                    type='outline'
                    onPress={() => console.log('oi')}
                />
            </ButtonContainer>
        </Container>
    )
}