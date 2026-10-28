import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Session, User } from '../types';

const USERS_KEY = 'mock_users';
const SESSION_KEY = 'session';

type StoredUser = User & { password: string };

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function getUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as StoredUser[]) : [];
}

function fakeToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<Session> {
  await wait(600); // simula la espera de una petición de red

  const users = await getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === normalizedEmail)) {
    throw new Error('Ya existe una cuenta con ese correo.');
  }

  const newUser: StoredUser = {
    id: String(Date.now()),
    name: name.trim(),
    email: normalizedEmail,
    password, // solo para la simulación
  };

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

  const { password: _omit, ...user } = newUser;
  return { token: fakeToken(), user };
}

export async function login(email: string, password: string): Promise<Session> {
  await wait(600);

  const users = await getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const found = users.find(
    (u) => u.email === normalizedEmail && u.password === password,
  );

  if (!found) {
    throw new Error('Correo o contraseña incorrectos.');
  }

  const { password: _omit, ...user } = found;
  return { token: fakeToken(), user };
}

export async function saveSession(session: Session): Promise<void> {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

export async function loadSession(): Promise<Session | null> {
  const raw = await SecureStore.getItemAsync(SESSION_KEY);
  return raw ? (JSON.parse(raw) as Session) : null;
}

export async function clearSession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}