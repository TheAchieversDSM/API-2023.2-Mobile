import { ActivityIndicator, LogBox } from 'react-native';
import React, { useEffect, useState } from "react";
import { ThemeProvider } from 'styled-components/native';
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
  const [state, setState] = useState({
    date: new Date(),
    status: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqStatus = await apiStatus.checkApi();
        if (reqStatus === 200) {
          setState({ ...state, status: true });
        } else {
          setState({ ...state, status: false });
        }
      } catch (error) {
        console.error('Erro ao verificar o status da API:', error);
        setState({ ...state, status: false });
      }
    };

    const intervalId = setInterval(() => {
      setState({ ...state, date: new Date() })
      fetchData();
    }, 60000);

    fetchData();
    return () => {
      clearInterval(intervalId);
    };
  }, [state.status]);


  if (!fontLoaded) {
    return <ActivityIndicator />
  }

  if (!state.status) {
    return (
      <ThemeProvider theme={theme}>
        <NotFound date={state.date} />
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