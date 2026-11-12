import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home({ user, computers, onLogout, onRegisterComputer }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Bem-vindo</Text>
          <Text style={styles.title}>{user?.name || 'Usuário'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Computadores cadastrados</Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {computers.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Nenhum computador cadastrado</Text>
            <Text style={styles.emptyText}>Cadastre o primeiro computador para começar.</Text>
          </View>
        ) : (
          computers.map((computer) => (
            <View key={computer.id} style={styles.card}>
              <Text style={styles.cardTitle}>{computer.nome_dispositivo}</Text>
              <Text style={styles.cardText}>Código: {computer.codigo}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.primaryButton} onPress={onRegisterComputer}>
        <Text style={styles.primaryButtonText}>Cadastrar computador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 24,
  },
  subtitle: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#e2e8f0',
  },
  logoutText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dfe7f5',
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dfe7f5',
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    color: '#475569',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
