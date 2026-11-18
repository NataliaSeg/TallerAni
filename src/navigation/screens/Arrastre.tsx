import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BotonPastilla } from '../../components/BotonPastilla';
import { Escenario, Lienzo } from '../../components/Lienzo';
import { colors } from '../../estilos';

const TAM = 130;

export function Arrastre() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const inicioX = useSharedValue(0);
  const inicioY = useSharedValue(0);
  const giro = useSharedValue(0);
  const elevar = useSharedValue(0);
  const anchoEscenario = useSharedValue(0);
  const altoEscenario = useSharedValue(0);

  const arrastrar = Gesture.Pan()
    .onBegin(() => {
      inicioX.value = x.value;
      inicioY.value = y.value;
      elevar.value = withSpring(1);
    })
    .onUpdate((e) => {
      const maxX = Math.max(0, (anchoEscenario.value - TAM) / 2);
      const maxY = Math.max(0, (altoEscenario.value - TAM) / 2);
      x.value = Math.min(maxX, Math.max(-maxX, inicioX.value + e.translationX));
      y.value = Math.min(maxY, Math.max(-maxY, inicioY.value + e.translationY));
      // Izquierda -> grados negativos (gira a la izquierda); derecha -> positivos.
      giro.value = Math.max(-60, Math.min(60, e.translationX / 2.5));
    })
    .onFinalize(() => {
      giro.value = withSpring(0, { damping: 7, stiffness: 110 });
      elevar.value = withSpring(0);
    });

  const estiloFigura = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotate: `${giro.value}deg` },
      { scale: 1 + elevar.value * 0.14 },
    ],
  }));

  const centrar = () => {
    x.value = withSpring(0);
    y.value = withSpring(0);
  };

  return (
    <Lienzo
      title="Arrastrar y rotar"
      hint="Mueve la estrella: si la llevas a la izquierda gira a la izquierda, y si la llevas a la derecha gira a la derecha."
      accent={colors.rose}
      wash="#FFE0EC"
    >
      <Escenario
        onLayout={(e) => {
          anchoEscenario.value = e.nativeEvent.layout.width;
          altoEscenario.value = e.nativeEvent.layout.height;
        }}
      >
        <GestureDetector gesture={arrastrar}>
          <Animated.View style={[styles.figura, estiloFigura]}>
            <MaterialCommunityIcons name="star-four-points" size={84} color="#FFFFFF" />
          </Animated.View>
        </GestureDetector>
        <BotonPastilla label="Centrar" icon="crosshairs-gps" color={colors.rose} onPress={centrar} style={styles.centrar} />
      </Escenario>
    </Lienzo>
  );
}

const styles = StyleSheet.create({
  figura: {
    width: TAM,
    height: TAM,
    borderRadius: 38,
    backgroundColor: colors.rose,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.rose,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    cursor: 'grab',
  } as any,
  centrar: { position: 'absolute', right: 16, bottom: 12 },
});
