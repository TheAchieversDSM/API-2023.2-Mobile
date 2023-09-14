import { Button } from '../../components/button/button';
import { DropdownComponent } from '../../components/dropdown/dropdown';
import Input from '../../components/input/input';
import { ButtonContainer, Container } from './styled';

const priority = [
    { label: 'Alta', value: '1' },
    { label: 'Média', value: '2' },
    { label: 'Baixa', value: '3' }
];

export default function CreateTask() {
    return (
        <Container>
            <Input
                placeholder='Insira o nome da tarefa'
                onChange={() => console.log('oi')}
                color='white'
                textColor='#fff'
                iconL='list-ul'
            />

            <Input
                placeholder='Insira a descrição da tarefa'
                onChange={() => console.log('oi')}
                color='white'
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
                iconName='star'
                iconColor='white'
                iconSize={25}
                width={335}
            />

            <Input
                placeholder='Insira a recorrência da tarefa'
                onChange={() => console.log('oi')}
                color='white'
                textColor='#fff'
                iconL='refresh'
            />

            <Input
                placeholder='Insira com quem compartilhar'
                onChange={() => console.log('oi')}
                color='white'
                textColor='#fff'
                iconL='user-o'
            />

            <ButtonContainer>
                <Button
                    title='Criar tarefa'
                    borderColor='#DE0300'
                    backgroundColor='#DE0300'
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