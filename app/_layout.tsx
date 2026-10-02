import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider, useSettings } from "../lib/settings";
import { colors } from "../lib/theme";
import "../global.css";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 400, fade: true });

function RootStack() {
  const { ready } = useSettings();

  // Keep the splash up until persisted settings are loaded, so the exam starts with the right filters.
  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="explorer/[id]" options={{ animation: "slide_from_right" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaProvider>
        <SettingsProvider>
          <RootStack />
          <StatusBar style="light" />
        </SettingsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
