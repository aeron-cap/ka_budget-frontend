import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { Navigation } from './navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}
// export function App() {
//   const colorScheme = useColorScheme();

//   const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

//   return (
//     <Navigation
//       theme={theme}
//       linking={{
//         enabled: 'auto',
//         prefixes: [prefix],
//       }}
//       onReady={() => {
//         SplashScreen.hideAsync();
//       }}
//     />
//   );
// }
