import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme } from '@react-navigation/native';
import type { ComponentProps } from 'react';

export const colors = {
  base: '#FFF6FA', // fondo del inicio
  paper: '#FFFFFF',
  ink: '#4A1D3F', // texto principal (ciruela)
  inkSoft: '#8A5F7E',
  line: '#F6D5E4',
  rose: '#F0508F',
  lilac: '#9B7BF0',
  mint: '#0F9D8A',
  peach: '#F26D3D',
  sky: '#2F8FE0',
  orchid: '#C04BDA',
};

/** Color con transparencia (hex de 6 dígitos + alfa de 2 dígitos). */
export const tint = (hex: string, alpha = '1F') => `${hex}${alpha}`;

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.rose,
    background: colors.base,
    card: colors.base,
    text: colors.ink,
    border: 'transparent',
    notification: colors.rose,
  },
};

export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

// Cada ejercicio tiene su acento, su fondo suave ("wash") y su ícono.
export const exercises = [
  { route: 'Arrastre', title: 'Arrastrar y rotar', color: colors.rose, wash: '#FFE0EC', icon: 'cursor-move' },
  { route: 'Cargando', title: 'Animación de carga', color: colors.lilac, wash: '#ECE4FF', icon: 'timer-sand' },
  { route: 'Multitoque', title: 'Gestos multitáctiles', color: colors.mint, wash: '#D8F6EF', icon: 'gesture-pinch' },
  { route: 'Rebotar', title: 'Rebote', color: colors.peach, wash: '#FFE5D8', icon: 'basketball' },
  { route: 'Carrusel', title: 'Carrusel', color: colors.sky, wash: '#DBEDFF', icon: 'view-carousel-outline' },
  { route: 'Agitar', title: 'Sacudir el celular', color: colors.orchid, wash: '#F5DCFA', icon: 'vibrate' },
] as const satisfies ReadonlyArray<{
  route: string;
  title: string;
  color: string;
  wash: string;
  icon: IconName;
}>;
