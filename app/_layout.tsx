import { SessionProvider } from '@/auth/ctx';
import { AuthProvider } from '@/auth/useAuth';
import { StorageProvider } from '@/Context/StorageContext';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StorageProvider>
      <SessionProvider>
        <AuthProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="video" options={{ headerShown: false }} />
              <Stack.Screen name="VideoHistory" options={{ headerShown: false }} />
              <Stack.Screen name="post" options={{ headerShown: false }} />
              <Stack.Screen name="event" options={{ headerShown: false }} />
              <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
              <Stack.Screen name="reset-password" options={{ headerShown: false }} />
              <Stack.Screen name="update-account" options={{ headerShown: false }} />
              <Stack.Screen name="changepassword" options={{ headerShown: false }} />
              <Stack.Screen name="school" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </AuthProvider>
      </SessionProvider>
    </StorageProvider>
  );
}
