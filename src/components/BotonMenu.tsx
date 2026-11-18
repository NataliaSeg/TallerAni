import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../estilos';

/** Botón de las tres rayas, dentro de un círculo blanco. */
export function BotonMenu() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      accessibilityRole="button"
      accessibilityLabel="Abrir o cerrar el menú"
      style={({ pressed }) => [styles.boton, { opacity: pressed ? 0.8 : 1 }]}
    >
      <MaterialCommunityIcons name="menu" size={24} color={colors.ink} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.rose,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
