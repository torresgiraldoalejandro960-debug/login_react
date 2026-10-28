import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola, {user?.name}! 🎉</Text>
      <Text style={styles.subtitle}>Has iniciado sesión con</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.spacer} />
      <Button title="Cerrar sesión" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  title: { fontSize: 28, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 15, color: '#6b7280', marginTop: 8 },
  email: { fontSize: 16, fontWeight: '600', color: '#2563eb', marginTop: 2 },
  spacer: { height: 32 },
});