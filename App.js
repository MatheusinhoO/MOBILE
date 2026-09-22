import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Home from './pages/home';
import Login from './pages/login';
import PcRegister from './pages/PcRegister';
import Register from './pages/register';
import Splash from './pages/splash';

const USERS_KEY = 'users';
const COMPUTERS_KEY = 'computers';
const SESSION_KEY = 'sessionUser';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [users, setUsers] = useState([]);
  const [computers, setComputers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    persistData();
  }, [users, computers, loggedUser, isReady]);

  const loadStoredData = async () => {
    try {
      const [storedUsers, storedComputers, storedSession] = await Promise.all([
        AsyncStorage.getItem(USERS_KEY),
        AsyncStorage.getItem(COMPUTERS_KEY),
        AsyncStorage.getItem(SESSION_KEY),
      ]);

      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      const parsedComputers = storedComputers ? JSON.parse(storedComputers) : [];
      const parsedSession = storedSession ? JSON.parse(storedSession) : null;

      setUsers(parsedUsers);
      setComputers(parsedComputers);
      setLoggedUser(parsedSession);

      if (parsedSession) {
        setScreen('home');
      }
    } catch (error) {
      console.log('Erro ao carregar dados salvos:', error);
    } finally {
      setIsReady(true);
    }
  };

  const persistData = async () => {
    try {
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(COMPUTERS_KEY, JSON.stringify(computers));
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(loggedUser || null));
    } catch (error) {
      console.log('Erro ao salvar dados:', error);
    }
  };

  const handleRegisterUser = async ({ name, cpf, senha, rm }) => {
    const cleanName = name.trim();
    const cleanCpf = cpf.replace(/\D/g, '');
    const cleanRm = rm.replace(/\D/g, '');

    if (!cleanName || !cleanCpf || !cleanRm || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, CPF, RM e senha.');
      return false;
    }

    if (cleanCpf.length !== 11) {
      Alert.alert('CPF inválido', 'O CPF deve ter 11 números.');
      return false;
    }

    if (!/^\d{4}$/.test(cleanRm)) {
      Alert.alert('RM inválido', 'O RM deve ter exatamente 4 dígitos.');
      return false;
    }

    const cpfExists = users.some((user) => user.cpf === cleanCpf);
    if (cpfExists) {
      Alert.alert('CPF já cadastrado', 'Esse CPF já está sendo usado.');
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name: cleanName,
      cpf: cleanCpf,
      senha: senha.trim(),
      rm: cleanRm,
    };

    setUsers((prev) => [...prev, newUser]);
    Alert.alert('Cadastro concluído', 'Seu usuário foi cadastrado com sucesso!');
    setScreen('login');
    return true;
  };

  const handleLoginUser = async ({ cpf, rm, senha }) => {
    const cleanCpf = cpf.replace(/\D/g, '');
    const cleanRm = rm.replace(/\D/g, '');

    if (!cleanCpf || !cleanRm || !senha.trim()) {
      Alert.alert('Dados incompletos', 'Informe CPF, RM e senha para entrar.');
      return false;
    }

    const user = users.find(
      (item) => item.cpf === cleanCpf && item.rm === cleanRm && item.senha === senha.trim()
    );

    if (!user) {
      Alert.alert('Credenciais inválidas', 'CPF, RM ou senha não conferem.');
      return false;
    }

    setLoggedUser(user);
    setScreen('home');
    return true;
  };

  const handleAddComputer = async ({ nome, codigo }) => {
    const cleanName = nome.trim();
    const cleanCode = codigo.replace(/\D/g, '');

    if (!cleanName || !cleanCode) {
      Alert.alert('Dados incompletos', 'Preencha o nome e o código do computador.');
      return false;
    }

    if (!/^\d{7}$/.test(cleanCode)) {
      Alert.alert('Código inválido', 'O código deve ter exatamente 7 dígitos.');
      return false;
    }

    const newComputer = {
      id: Date.now().toString(),
      nome: cleanName,
      codigo: cleanCode,
    };

    setComputers((prev) => [newComputer, ...prev]);
    Alert.alert('Computador registrado', 'O computador foi cadastrado com sucesso.');
    setScreen('home');
    return true;
  };

  const handleLogout = () => {
    setLoggedUser(null);
    setScreen('splash');
  };

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {screen === 'splash' && (
        <Splash
          onLogin={() => setScreen('login')}
          onRegister={() => setScreen('register')}
        />
      )}

      {screen === 'login' && (
        <Login
          onRegister={() => setScreen('register')}
          onLogin={handleLoginUser}
        />
      )}

      {screen === 'register' && (
        <Register
          onLogin={() => setScreen('login')}
          onRegister={handleRegisterUser}
        />
      )}

      {screen === 'home' && (
        <Home
          user={loggedUser}
          computers={computers}
          onLogout={handleLogout}
          onRegisterComputer={() => setScreen('pc-register')}
        />
      )}

      {screen === 'pc-register' && (
        <PcRegister
          onBack={() => setScreen('home')}
          onRegister={handleAddComputer}
        />
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});
