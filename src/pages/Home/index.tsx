import React, { useEffect, useState } from 'react';
import { Box, Container, SubTextTitle, TextTitle, ViewContainer } from './styled';
import {
  ScrollView,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Checkbox } from '../../components/checkbox/checkbox';
import { ListItem } from '@rneui/themed';
import { useAuth } from '../../hooks/auth';
import { decodeJsonWebToken } from '../../utils/utils';
import { IGetTasksUserResp } from '../../interfaces/task';
import serviceTask from '../../service/task';
import day from 'react-native-calendars/src/calendar/day';
import { Cards } from '../../components/cards/cards';

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
  const {userToken} = useAuth()
  const {id} = decodeJsonWebToken(String(userToken))

  useEffect(() => {
    async function fetchUserDateTasks() {
      try {
        const response = await serviceTask.getTaskUserDate({ userId: id, deadline: String(selected) });
        if (response) {
          setDateTasks(response.data.data);
        } else {
          console.error("Erro ao buscar tarefas do usuário");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserDateTasks();
  }, []);
  console.log(dateTasks)

    return (
      <>
        <Container>
            <Calendar 
              onDayPress={day => {
                setSelected(day.dateString);
                setSelectedDay(String(day.day))
                setSelectedMonth(String(day.month))
                console.log('selected day', day.day);
              }}

              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true}
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
                textDayFontFamily: 'Poppins_400Regular',
                textMonthFontFamily: 'Poppins_400Regular', // Substitua 'SuaFonteMes' pelo nome da fonte para meses
                textDayHeaderFontFamily: 'Poppins_500Regular',
                textDayFontSize: 15,
                textDayHeaderFontSize: 20,
              }}

              style = {{
                marginTop: 10,
                marginBottom: 10,
              }}
            />

            <ViewContainer>
              <ScrollView>
                <Box>
                  <TextTitle>Expira dia {selectedDay}/{selectedMonth}</TextTitle>
                  {dateTasks?.map((task, index) => (
                    task.deadline === String(selected) && task.status === "TO DO" &&(
                      <Cards
                        key={index}
                        task={task.name} // Substitua 'title' pelo nome correto do campo da tarefa
                        descricao={task.description} // Substitua 'description' pelo nome correto do campo da tarefa
                        status='error'
                        value={task.status}
                        statusColor="#de0300"
                        date={task.deadline}
                      />
                    )
                    
                  ))}

                  {dateTasks?.map((task, index) => (
                    task.deadline === String(selected) && task.status === "DOING" &&(
                      <Cards
                        key={index}
                        task={task.name} // Substitua 'title' pelo nome correto do campo da tarefa
                        descricao={task.description} // Substitua 'description' pelo nome correto do campo da tarefa
                        status='warning'
                        value={task.status}
                        statusColor="#ebae11"
                        date={task.deadline}
                      />
                    )
                    
                  ))}
                  

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