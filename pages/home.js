import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home({ onLogin, onRegister }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Acesse sua conta ou crie um novo cadastro.</Text>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineButton} onPress={onRegister}>
        <Text style={styles.outlineButtonText}>Criar cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { color: '#fff', fontSize: 34, fontWeight: '700', marginBottom: 12 },
  subtitle: { color: '#dbeafe', fontSize: 16, textAlign: 'center', marginBottom: 36 },
  button: { backgroundColor: '#fff', borderRadius: 8, padding: 16, width: '100%', alignItems: 'center', marginBottom: 14 },
  buttonText: { color: '#0d47a1', fontSize: 16, fontWeight: '700' },
  outlineButton: { borderColor: '#fff', borderRadius: 8, borderWidth: 1, padding: 15, width: '100%', alignItems: 'center' },
  outlineButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
