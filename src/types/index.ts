export type User = {
  id: string;
  name: string;
  email: string;
};

export type Session = {
  token: string;
  user: User;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};