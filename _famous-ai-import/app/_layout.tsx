import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { SavedProceduresProvider } from '../contexts/SavedProceduresContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SavedProceduresProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="home" />
          <Stack.Screen name="procedures" />
          <Stack.Screen name="procedure/[id]" />
          <Stack.Screen name="chatbot" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="resources" />
          <Stack.Screen name="saved" />
          <Stack.Screen name="blog" />
          <Stack.Screen name="updates" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="admin" />
        </Stack>
      </SavedProceduresProvider>
    </AuthProvider>
  );
}

