import React, { useEffect, useState } from 'react';
import { Box, Container, NoTasksText, SubTextTitle, TextTitle, ViewContainer } from './styled';
import { ScrollView, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useAuth } from '../../hooks/auth';
import { decodeJsonWebToken } from '../../utils/utils';
import { IGetTasksUserResp, IHomeReturn } from '../../interfaces/task';
import serviceTask from '../../service/task';
import { Cards } from '../../components/cards/cards';
import { HeaderComponent } from '../../components/header';
import { ViewCards } from './cards';
import { useTheme } from 'styled-components';
import { apiStatus } from '../../service/api';
import { Divider } from '@rneui/base';

LocaleConfig.defaultLocale = 'br';

LocaleConfig.locales['br'] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ],
  monthNamesShort: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
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
  const theme = useTheme()
  const [selected, setSelected] = useState<string>(new Date().toISOString().split('T')[0]); // Define a data atual como selecionada
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [dateTasks, setDateTasks] = useState<IHomeReturn>({} as IHomeReturn);
  const { userToken } = useAuth();
  const { id } = decodeJsonWebToken(String(userToken));

  useEffect(() => {
    setDateTasks({} as IHomeReturn)

    async function fetchUserDateTasks() {
      try {
        const response: IHomeReturn = await serviceTask.getTaskUserDate({ userId: id, deadline: String(selected) });

        if (response) {
          setDateTasks(response);
        }

      } catch (error) {
        console.error(error);
      }
    }

    fetchUserDateTasks();
  }, [selected]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await apiStatus.checkTasks(id)
      } catch (error) {
        console.error('Erro ao verificar as tarefas ciclicas a serem renovadas: ', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    fetchData();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Container>
        <View style={{ backgroundColor: '#222328' }}><HeaderComponent /></View>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
            setSelectedDay(String(day.day));
            setSelectedMonth(String(day.month));
          }}

          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true }
          }}

          theme={{
            backgroundColor: '#222328',
            calendarBackground: '#222328',
            textSectionTitleColor: '#de0300',
            selectedDayBackgroundColor: '#de0300',
            selectedDayTextColor: '#e7e7e7',
            todayTextColor: '#de0300',
            dayTextColor: '#E7E7E7',
            textDisabledColor: '#808080',
            monthTextColor: '#de0300',
            arrowColor: '#E7E7E7',
            textDayFontFamily: theme.FONTS.Poppins_400Regular,
            textMonthFontFamily: theme.FONTS.Poppins_500Medium,
            textDayHeaderFontFamily: theme.FONTS.Poppins_500Medium,
            textDayFontSize: 15,
            textMonthFontSize: 25,
            textDayHeaderFontSize: 18,
          }}

          style={{
            marginTop: 10,
            marginBottom: 10,
          }}

        />

        <ViewContainer>
          <Box>
            {selectedDay ?
              <>
                <TextTitle>Expira dia {selectedDay}/{selectedMonth}</TextTitle>
                <ScrollView>
                  <Divider style={{ marginVertical: 5 }} />
                  {
                    dateTasks.data ? (
                      <>
                        {
                          dateTasks?.data?.recorrente?.length > 0 ? (
                            <>
                              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tarefas recorrentes</Text>
                              {
                                dateTasks.data.recorrente.map((task, index) => (
                                  task.deadline === String(selected) && (
                                    <ViewCards
                                      key={task.id}
                                      {...task}
                                    />
                                  )
                                ))
                              }
                              <Divider
                                style={{ marginVertical: 15 }}
                              />
                            </>
                          ) : 
                          null
                        }
                        {
                          dateTasks?.data?.naoRecorrente?.length > 0 ? (
                            <>
                              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tarefas não recorrentes</Text>
                              {
                                dateTasks.data.naoRecorrente.map((task, index) => (
                                  task.deadline === String(selected) && (
                                    <ViewCards
                                      key={task.id}
                                      {...task}
                                    />
                                  )
                                ))
                              }
                              <View style={{ marginBottom: 50 }} />
                            </>
                          ) : 
                          null
                        }
                      </>
                    ) : (
                      <NoTasksText>Não há tarefas para esta data</NoTasksText>
                    )
                  }
                </ScrollView>
              </> :
              <NoTasksText>Selecione uma data</NoTasksText>
            }
          </Box>
        </ViewContainer>
      </Container>
    </>
  );

}