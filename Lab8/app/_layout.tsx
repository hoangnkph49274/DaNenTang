import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Bai1 from './index';
import Bai2 from './bai2';
import Bai3 from './bai3';

import { useColorScheme } from '@/hooks/useColorScheme';


SplashScreen.preventAutoHideAsync();
const Drawer = createDrawerNavigator();
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator>
        <Drawer.Screen
        name="Bài 1"
        component={Bai1}
        />
        <Drawer.Screen
        name="Bài 2"
        component={Bai2}
        />
        <Drawer.Screen
        name="Bài 3"
        component={Bai3}
        />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
