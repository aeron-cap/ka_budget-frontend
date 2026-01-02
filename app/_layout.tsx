import { AuthProvider } from "@/src/auth/AuthProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen
          name="(modals)/add"
          options={{
            presentation: "transparentModal"
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
