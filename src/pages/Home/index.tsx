import React, { useState } from 'react';
import { Box, Container, SubTextTitle, TextTitle, ViewContainer } from './styled';
import {
  ScrollView,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Checkbox } from '../../components/checkbox/checkbox';

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
    return (
      <>
        <Container>
            <Calendar 
              onDayPress={day => {
                setSelected(day.dateString);
                console.log('selected day', day);
              }}

              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true}
              }}

              theme={{
                backgroundColor: '#393939',
                calendarBackground: '#393939',
                textSectionTitleColor: '#c74634',
                selectedDayBackgroundColor: '#c74634',
                selectedDayTextColor: '#e7e7e7',
                todayTextColor: '#c74634',
                dayTextColor: '#E7E7E7',
                textDisabledColor: '#808080',
                monthTextColor: '#c74634',
                arrowColor: '#E7E7E7',
              }}

              style = {{
                marginTop: 10,
                marginBottom: 10
              }}
            />

            <ViewContainer>
              <ScrollView>
                <Box>
                  <TextTitle>Hoje</TextTitle>
                  <SubTextTitle>Tasks diárias</SubTextTitle>
                  <Checkbox label= "Tarefa 1"/>
                  <Checkbox label= "Tarefa 1"/>
                  <SubTextTitle>Tasks semanais</SubTextTitle>
                  <Checkbox label= "Tarefa 2"/>
                  <Checkbox label= "Tarefa 2"/>
                </Box>
              </ScrollView>
            </ViewContainer>
            {/* <Menu/> */}
        </Container>
      </>
    );
}