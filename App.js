import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { apiRequest } from './api';
import Home from './pages/home';
import Login from './pages/login';
import PcRegister from './pages/PcRegister';
import Register from './pages/register';
import Splash from './pages/splash';

const SESSION_KEY = 'sessionUser';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [computers, setComputers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(SESSION_KEY, JSON.stringify(loggedUser)).catch((error) => {
      console.log('Erro ao salvar a sessão:', error);
    });
  }, [loggedUser, isReady]);

  const loadStoredData = async () => {
    try {
      const storedSession = await AsyncStorage.getItem(SESSION_KEY);
      const parsedSession = storedSession ? JSON.parse(storedSession) : null;
      setLoggedUser(parsedSession);

      if (parsedSession) {
        setScreen('home');
      }
    } catch (error) {
      console.log('Erro ao carregar a sessão salva:', error);
    }

    try {
      setComputers(await apiRequest('/computadores'));
    } catch (error) {
      Alert.alert('Erro de conexão', `Não foi possível carregar os computadores. ${error.message}`);
    } finally {
      setIsReady(true);
    }
  };

  const handleRegisterUser = async ({ name, email, cpf, senha }) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCpf = cpf.replace(/\D/g, '');

    if (!cleanName || !cleanEmail || !cleanCpf || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail, CPF e senha.');
      return false;
    }

    if (cleanCpf.length !== 11) {
      Alert.alert('CPF inválido', 'O CPF deve ter 11 números.');
      return false;
    }

    try {
      await apiRequest('/cadastro_usuario', {
        method: 'POST',
        body: {
          nome: cleanName,
          email: cleanEmail,
          senha: senha.trim(),
          cpf: cleanCpf,
        },
      });
      Alert.alert('Cadastro concluído', 'Seu usuário foi cadastrado com sucesso!');
      setScreen('login');
      return true;
    } catch (error) {
      Alert.alert('Erro no cadastro', error.message);
      return false;
    }
  };

  const handleLoginUser = async ({ email, senha }) => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !senha.trim()) {
      Alert.alert('Dados incompletos', 'Informe e-mail e senha para entrar.');
      return false;
    }

    try {
      const response = await apiRequest('/login', {
        method: 'POST',
        body: { email: cleanEmail, senha: senha.trim() },
      });
      if (response.erro !== 'n' || !response.usuario) {
        throw new Error(response.mensagem || 'Não foi possível entrar.');
      }

      setLoggedUser({ ...response.usuario, token: response.token });
      setScreen('home');
      return true;
    } catch (error) {
      Alert.alert('Erro no login', error.message);
      return false;
    }
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

    try {
      await apiRequest('/cadastro_computador', {
        method: 'POST',
        body: { nome_dispositivo: cleanName, codigo: cleanCode },
      });
    } catch (error) {
      Alert.alert('Erro ao cadastrar computador', error.message);
      return false;
    }

    setScreen('home');
    try {
      setComputers(await apiRequest('/computadores'));
      Alert.alert('Computador registrado', 'O computador foi cadastrado com sucesso.');
    } catch (error) {
      Alert.alert(
        'Computador cadastrado',
        `O computador foi salvo, mas a lista não pôde ser atualizada. ${error.message}`
      );
    }
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
