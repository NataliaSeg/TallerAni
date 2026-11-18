import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BotonMenu } from '../components/BotonMenu';
import { colors, exercises, IconName } from '../estilos';
import { MenuLateral } from './MenuLateral';
import { Agitar } from './screens/Agitar';
import { Arrastre } from './screens/Arrastre';
import { Cargando } from './screens/Cargando';
import { Carrusel } from './screens/Carrusel';
import { Inicio } from './screens/Inicio';
import { Multitoque } from './screens/Multitoque';
import { NoEncontrada } from './screens/NoEncontrada';
import { Rebotar } from './screens/Rebotar';

// En cada pantalla el encabezado solo muestra el botón de las tres rayas.
const opciones = (title: string, color: string, icon: IconName, wash: string) => ({
  title,
  headerTitle: '',
  headerLeft: () => <BotonMenu />,
  headerStyle: { backgroundColor: wash },
  drawerActiveTintColor: color,
  drawerIcon: ({ color: c, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name={icon} size={size} color={c} />
  ),
});

const deEjercicio = (route: (typeof exercises)[number]['route']) => {
  const e = exercises.find((x) => x.route === route)!;
  return opciones(e.title, e.color, e.icon, e.wash);
};

// Menú lateral (Drawer): se abre y se cierra con el botón de las tres rayas.
const MenuPrincipal = createDrawerNavigator({
  drawerContent: (props) => <MenuLateral {...props} />,
  screenOptions: {
    drawerType: 'front',
    drawerStyle: { backgroundColor: colors.paper, width: 300 },
    overlayColor: 'rgba(74,29,63,0.35)',
    headerShadowVisible: false,
    sceneStyle: { backgroundColor: colors.base },
  },
  screens: {
    Inicio: { screen: Inicio, options: opciones('Inicio', colors.rose, 'flower-tulip-outline', colors.base) },
    Arrastre: { screen: Arrastre, options: deEjercicio('Arrastre') },
    Cargando: { screen: Cargando, options: deEjercicio('Cargando') },
    Multitoque: { screen: Multitoque, options: deEjercicio('Multitoque') },
    Rebotar: { screen: Rebotar, options: deEjercicio('Rebotar') },
    Carrusel: { screen: Carrusel, options: deEjercicio('Carrusel') },
    Agitar: { screen: Agitar, options: deEjercicio('Agitar') },
  },
});

const PilaRaiz = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Principal: { screen: MenuPrincipal },
    NoEncontrada: {
      screen: NoEncontrada,
      options: { title: '404' },
      linking: { path: '*' },
    },
  },
});

export const Navigation = createStaticNavigation(PilaRaiz);

type RaizParamList = StaticParamList<typeof PilaRaiz>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RaizParamList {}
  }
}
