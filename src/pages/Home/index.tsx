import { Box, Container, TextTitle, ViewContainer, NoTasksText } from './styled';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { IGetTasksUserResp } from '../../interfaces/task';
import { decodeJsonWebToken } from '../../utils/utils';
import React, { useEffect, useState } from 'react';
import serviceTask from '../../service/task';
import { useAuth } from '../../hooks/auth';
import { ScrollView } from 'react-native';
import { ListItem } from '@rneui/themed';
import { format } from 'date-fns'

LocaleConfig.defaultLocale = 'br';

LocaleConfig.locales['br'] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ],
  monthNamesShort: [
    "Jan", "Fev", "Março", "Abril", "Maio", "Jun", "Jul", "Agosto", "Set", "Out", "Nov", "Dez"
  ],
  dayNames: [
    "Domigo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
  ],
  dayNamesShort: [
    "D", "S", "T", "Q", "Q", "S", "S"
  ],
  today: "Hoje"
}

export default function Home() {
  const [selected, setSelected] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [dateTasks, setDateTasks] = useState<IGetTasksUserResp[]>();
  const { userToken } = useAuth();
  const today = format(new Date(), 'dd/MM');
  const { id } = decodeJsonWebToken(String(userToken))

  useEffect(() => {
    async function fetchUserDateTasks() {
      try {
        const response = await serviceTask.getTaskUserDate({ userId: id, deadline: format(new Date(), 'yyyy-MM-dd') });
        if (response) {
          setDateTasks(response.data);
        } else {
          console.error("Erro ao buscar tarefas do usuário");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserDateTasks();
  }, []);

  return (
    <>
      <Container>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
            console.log('selected day', day.day);
          }}

          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true }
          }}

          theme={{
            backgroundColor: '#393939',
            calendarBackground: '#393939',
            textSectionTitleColor: '#de0300',
            selectedDayBackgroundColor: '#de0300',
            selectedDayTextColor: '#e7e7e7',
            todayTextColor: '#de0300',
            dayTextColor: '#E7E7E7',
            textDisabledColor: '#808080',
            monthTextColor: '#de0300',
            arrowColor: '#E7E7E7',
          }}

          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
        />

        <ViewContainer>
          <ScrollView>
            <Box>
              <TextTitle>Expira dia {selected ? selected : today}</TextTitle>
              {dateTasks ? dateTasks?.map((task, index) => (
                task.deadline === String(selected) && (
                  <ListItem key={index}>
                    <ListItem.Title>{task.name}</ListItem.Title>
                  </ListItem>
                )

              )) : <NoTasksText>Nenhuma tarefa expira hoje</NoTasksText>}


              {/* TODO: Checkbox task com repetição para a próxima sprint */}
              {/* <Checkbox label= "Tarefa 1"/> */}
            </Box>
          </ScrollView>
        </ViewContainer>
        {/* <Menu/> */}
      </Container>
    </>
  );
}