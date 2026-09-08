import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

export default function App() {
  const [screen, setScreen] = useState('home');

  return (
    <View style={styles.container}>
      {screen === 'home' && (
        <Home
          onLogin={() => setScreen('login')}
          onRegister={() => setScreen('register')}
        />
      )}
      {screen === 'login' && (
        <Login
          onRegister={() => setScreen('register')}
          onHome={() => setScreen('home')}
        />
      )}
      {screen === 'register' && (
        <Register
          onLogin={() => setScreen('login')}
          onHome={() => setScreen('home')}
        />
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d47a1',
  },
});
