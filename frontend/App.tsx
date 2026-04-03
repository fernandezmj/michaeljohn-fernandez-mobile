import { appKit } from './src/config/appkit';
import { AppKitProvider, AppKit } from '@reown/appkit-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import {
  Orbitron_400Regular,
  Orbitron_500Medium,
  Orbitron_600SemiBold,
  Orbitron_700Bold,
} from '@expo-google-fonts/orbitron';
import {
  Exo2_300Light,
  Exo2_400Regular,
  Exo2_500Medium,
  Exo2_600SemiBold,
  Exo2_700Bold,
} from '@expo-google-fonts/exo-2';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Orbitron_400Regular,
      Orbitron_500Medium,
      Orbitron_600SemiBold,
      Orbitron_700Bold,
      Exo2_300Light,
      Exo2_400Regular,
      Exo2_500Medium,
      Exo2_600SemiBold,
      Exo2_700Bold,
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#F59E0B" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppKitProvider instance={appKit}>
        <HomeScreen />
        <AppKit />
      </AppKitProvider>
    </SafeAreaProvider>
  );
}
