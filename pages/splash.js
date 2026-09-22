import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Splash({ onLogin, onRegister }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Sistema</Text>
      <Text style={styles.title}>Gerenciamento de Computadores</Text>
      <Text style={styles.subtitle}>
        Controle seus computadores de forma simples e organizada.
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onRegister}>
        <Text style={styles.primaryButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onLogin}>
        <Text style={styles.secondaryButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    justifyContent: 'center',
  },
  badge: {
    color: '#93c5fd',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 18,
  },
  title: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
