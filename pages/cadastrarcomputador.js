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

export default function PcRegister({ onBack, onRegister }) {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleSubmit = () => {
    onRegister({ nome, codigo });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Cadastrar computador</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do computador"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Código (7 dígitos)"
          value={codigo}
          onChangeText={setCodigo}
          keyboardType="numeric"
          maxLength={7}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack}>
          <Text style={styles.link}>Voltar</Text>
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
