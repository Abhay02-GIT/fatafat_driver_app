import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from '@/navigation/RootNavigator';

const theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: '#0B0B0C', card: '#0B0B0C' },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}