import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';


export default function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
