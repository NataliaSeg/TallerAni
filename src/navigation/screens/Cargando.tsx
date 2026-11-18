import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Escenario, Lienzo } from '../../components/Lienzo';
import { colors, tint } from '../../estilos';

export function Cargando() {
  const giro = useSharedValue(0);
  const avance = useSharedValue(0);

  // La animación arranca sola al montar el componente.
  useEffect(() => {
    giro.value = withRepeat(withTiming(360, { duration: 1100, easing: Easing.linear }), -1, false);
    avance.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.cubic) }),
        withTiming(1, { duration: 350 }),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  }, [giro, avance]);

  const estiloGiro = useAnimatedStyle(() => ({
    transform: [{ rotate: `${giro.value}deg` }],
  }));

  const estiloRelleno = useAnimatedStyle(() => ({
    width: `${avance.value * 100}%`,
  }));

  return (
    <Lienzo
      title="Animación de carga"
      hint="El spinner y la barra empiezan solos y no se detienen."
      accent={colors.lilac}
      wash="#ECE4FF"
    >
      <Escenario>
        <View style={styles.centro}>
          <View style={styles.disco}>
            <View style={styles.pista} />
            <Animated.View style={[styles.arco, estiloGiro]} />
            <MaterialCommunityIcons name="flower-outline" size={38} color={colors.lilac} />
          </View>
          <Text style={styles.etiqueta}>Cargando…</Text>
          <View style={styles.barra}>
            <Animated.View style={[styles.relleno, estiloRelleno]}>
              <View style={styles.perilla} />
            </Animated.View>
          </View>
        </View>
      </Escenario>
    </Lienzo>
  );
}

const styles = StyleSheet.create({
  centro: { width: '100%', maxWidth: 360, alignItems: 'center', paddingHorizontal: 28 },
  disco: { width: 124, height: 124, alignItems: 'center', justifyContent: 'center' },
  pista: {
    position: 'absolute',
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 10,
    borderColor: tint(colors.lilac, '33'),
  },
  arco: {
    position: 'absolute',
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 10,
    borderColor: 'transparent',
    borderTopColor: colors.lilac,
    borderRightColor: colors.lilac,
  },
  etiqueta: { marginTop: 26, marginBottom: 16, fontSize: 17, fontWeight: '800', color: colors.ink },
  barra: {
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  relleno: { height: '100%', borderRadius: 10, backgroundColor: colors.lilac, justifyContent: 'center', alignItems: 'flex-end' },
  perilla: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFFFFF', marginRight: 3 },
});
