import { getUserName } from "@/service/local/service";
import { router, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { db, expo } from "@/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { runMigrations } from "@/db/runMigrations";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [hasName, setHasName] = useState(false);

  useDrizzleStudio(expo);

  useEffect(() => {
    async function prepare() {
      try {
        await runMigrations(db);
        const name = await getUserName();
        if (name) {
          setHasName(true);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (hasName) {
        router.replace("/(tabs)");
      }
    }
  }, [isReady, hasName]);

  if (!isReady) {
    return null;
  }

  return (
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
  );
}
