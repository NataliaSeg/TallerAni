import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BotonPastilla } from '../../components/BotonPastilla';
import { colors } from '../../estilos';

export function NoEncontrada() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta pantalla no existe</Text>
      <Text style={styles.text}>Revisa la dirección o vuelve al inicio.</Text>
      <BotonPastilla label="Ir al inicio" color={colors.rose} onPress={() => navigation.navigate('Principal' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: colors.base,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.ink },
  text: { fontSize: 16, color: colors.inkSoft, marginBottom: 8 },
});
