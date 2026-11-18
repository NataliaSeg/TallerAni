import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, tint } from '../../estilos';

export function Inicio() {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Taller de{'\n'}animaciones</Text>
        <Text style={styles.body}>
          Aquí encontrarás seis ejercicios de movimiento. Abre el menú y elige el que quieras probar.
        </Text>
        <View style={styles.pill}>
          <MaterialCommunityIcons name="menu" size={20} color={colors.rose} />
          <Text style={styles.pillText}>Toca las tres rayas de arriba para abrir el menú</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.base,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  content: { width: '100%', maxWidth: 520, gap: 16 },
  title: {
    fontSize: 46,
    lineHeight: 50,
    fontWeight: '800',
    letterSpacing: -1.5,
    color: colors.ink,
  },
  body: { fontSize: 17, lineHeight: 25, color: colors.inkSoft },
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: tint(colors.rose, '1A'),
  },
  pillText: { flexShrink: 1, fontSize: 14, fontWeight: '700', color: colors.rose },
});
