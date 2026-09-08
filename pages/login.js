import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login({ onRegister, onHome }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
			<TextInput style={styles.input} placeholder="Senha" secureTextEntry />
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Entrar</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onRegister}>
				<Text style={styles.link}>Ainda não tenho cadastro</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onHome}>
				<Text style={styles.back}>Voltar para Home</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f5f9ff', justifyContent: 'center', padding: 24 },
	title: { color: '#0d47a1', fontSize: 32, fontWeight: '700', marginBottom: 28, textAlign: 'center' },
	input: { backgroundColor: '#fff', borderColor: '#c7d8f2', borderRadius: 8, borderWidth: 1, fontSize: 16, marginBottom: 14, padding: 15 },
	button: { backgroundColor: '#0d47a1', borderRadius: 8, alignItems: 'center', padding: 16, marginTop: 4, marginBottom: 20 },
	buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
	link: { color: '#0d47a1', fontSize: 15, textAlign: 'center', fontWeight: '600' },
	back: { color: '#52657d', fontSize: 14, textAlign: 'center', marginTop: 24 },
});
