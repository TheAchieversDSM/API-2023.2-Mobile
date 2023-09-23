import React, { useEffect, useState } from 'react';
import { Box, Container, NoTasksText, SubTextTitle, TextTitle, ViewContainer } from './styled';
import {ScrollView, View} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useAuth } from '../../hooks/auth';
import { decodeJsonWebToken } from '../../utils/utils';
import { IGetTasksUserResp } from '../../interfaces/task';
import serviceTask from '../../service/task';
import { Cards } from '../../components/cards/cards';
import { HeaderComponent } from '../../components/header';

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
  
    return (
      <>
        <Container>
            <View style={{backgroundColor: '#393939'}}><HeaderComponent/></View>
            <Calendar 
              onDayPress={day => {
                setSelected(day.dateString);
                setSelectedDay(String(day.day))
                setSelectedMonth(String(day.month))
                console.log('selected day', day);
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
                textMonthFontFamily: 'Poppins_600Regular', // Substitua 'SuaFonteMes' pelo nome da fonte para meses
                textDayHeaderFontFamily: 'Poppins_500Regular',
                textDayFontSize: 15,
                textMonthFontSize: 25,
                textDayHeaderFontSize: 18,
              }}

              style = {{
                marginTop: 10,
                marginBottom: 10,
              }}

            />

            <ViewContainer>
                <Box>
                  <TextTitle>Expira dia {selectedDay}/{selectedMonth}</TextTitle>
                  <ScrollView>
                    {dateTasks ? dateTasks?.map((task, index) => (
                      task.deadline === String(selected) &&(
                          <Cards
                              id={task.id}
                              key={index}
                              task={task.name}
                              descricao={task.description}
                              status='error'
                              value={"A Fazer"}
                              statusColor="#de0300"
                              deadline={task.deadline}
                              priority={task.priority}
                          />
                      )

                    )) : <NoTasksText>Nenhuma tarefa expirada nessa data</NoTasksText>}
                  </ScrollView>
                  

                  {/* TODO: Checkbox task com repetição para a próxima sprint */}
                  {/* <Checkbox label= "Tarefa 1"/> */}
                </Box>
            </ViewContainer>
            {/* <Menu/> */}
        </Container>
      </>
    );

}