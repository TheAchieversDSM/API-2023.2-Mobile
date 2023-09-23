import { ActivityIndicator, LogBox } from 'react-native';
import React, { useEffect, useState } from "react";
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './src/hooks/auth';
import fontsLoaded from './src/utils/fonts';
import theme from './src/assets/styles';
import { Routes } from './src/routes';
import { apiStatus } from './src/service/api';
import { Text } from '@rneui/themed';
import { NotFound } from './src/pages/NotFound';

LogBox.ignoreAllLogs()

export default function App() {

  const fontLoaded = fontsLoaded.fontsLoaded();
  const [date, setDate] = useState(new Date())
  const [status, setStatus] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqStatus = await apiStatus.checkApi();
        if (reqStatus === 200) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      } catch (error) {
        console.error('Erro ao verificar o status da API:', error);
        setStatus(false);
      }
    };

    const intervalId = setInterval(() => {
      setDate(new Date())
      fetchData();
    }, 60000);

    fetchData();
    return () => {
      clearInterval(intervalId);
    };
  }, [status]);


  if (!fontLoaded) {
    return <ActivityIndicator />
  }

  if (!status) {
    return (
      <ThemeProvider theme={theme}>
        <NotFound date={date} />
      </ThemeProvider>
    )

  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}