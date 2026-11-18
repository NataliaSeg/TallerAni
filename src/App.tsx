import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './navigation';
import { navTheme } from './estilos';

Asset.loadAsync([...NavigationAssets, require('./assets/dog.jpg')]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Navigation
        theme={navTheme}
        linking={{ enabled: 'auto', prefixes: [prefix] }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </GestureHandlerRootView>
  );
}
