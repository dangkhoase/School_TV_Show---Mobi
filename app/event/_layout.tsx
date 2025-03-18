import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#ffcc00' },
        headerTintColor: '#333',
        headerTitle: 'Login',
        headerShown: false,
      }}
    />
  );
}
