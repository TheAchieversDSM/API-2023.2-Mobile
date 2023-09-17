import { ActivityIndicator, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './src/hooks/auth';
import fontsLoaded from './src/utils/fonts';
import theme from './src/assets/styles';
import { Routes } from './src/routes';

LogBox.ignoreAllLogs()

export default function App() {

  const fontLoaded = fontsLoaded.fontsLoaded();

  if (!fontLoaded) {
    return <ActivityIndicator />
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}