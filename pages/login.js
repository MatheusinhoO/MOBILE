import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login({ onRegister, onLogin }) {
  const [cpf, setCpf] = useState('');
  const [rm, setRm] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    onLogin({ cpf, rm, senha });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          maxLength={11}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="RM (4 dígitos)"
          value={rm}
          onChangeText={setRm}
          keyboardType="numeric"
          maxLength={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.link}>Não tenho cadastro</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#dbe3f0',
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    color: '#2563eb',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});
