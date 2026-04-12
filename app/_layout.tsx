import { db, expo } from "@/db";
import { runMigrations } from "@/db/runMigrations";
import { getLocalUser } from "@/service/local/service";
import { getUser } from "@/service/repositories/userRepository";
import {
    PlayfairDisplay_400Regular,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    useFonts,
} from "@expo-google-fonts/playfair-display";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [hasName, setHasName] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_700Bold,
  });

  useDrizzleStudio(expo);

  useEffect(() => {
    async function prepare() {
      try {
        await runMigrations(db);
        const name = await getLocalUser();
        if (name) {
          const parsedUser = JSON.parse(name);
          const savedUser = await getUser(parsedUser.id, parsedUser.name);
          if (savedUser) {
            setHasName(true);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady && (fontsLoaded || fontError)) {
      if (hasName) {
        router.replace("/(tabs)");
      }
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 0);
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [isReady, hasName, fontsLoaded, fontError]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modals/add"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
