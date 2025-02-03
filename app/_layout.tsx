import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { tokenCache } from '@/cache';
import { ConvexProvider, ConvexReactClient } from "convex/react";


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    <ConvexProvider client={convex}>
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      {loaded && ( // Ensuring ClerkLoaded renders only after fonts are loaded
        <ClerkLoaded>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {/* expo-router handles navigation */}
            <Slot />
          </ThemeProvider>
        </ClerkLoaded>
      )}
      <StatusBar style="auto" />
    </ClerkProvider>
    </ConvexProvider>
  );
}
