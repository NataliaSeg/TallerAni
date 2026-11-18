import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { BotonPastilla } from '../../components/BotonPastilla';
import { Escenario, Lienzo } from '../../components/Lienzo';
import { colors } from '../../estilos';

const ESCALA_MIN = 0.5;
const ESCALA_MAX = 5;

export function Multitoque() {
  const [anchoEscenario, setAnchoEscenario] = useState(0);
  // Medidas en píxeles: más seguras en nativo que porcentajes + aspectRatio.
  const anchoFoto = Math.min(460, anchoEscenario * 0.7);
  const altoFoto = anchoFoto / 1.5;

  const escala = useSharedValue(1);
  const escalaGuardada = useSharedValue(1);
  const giro = useSharedValue(0);
  const giroGuardado = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const xGuardado = useSharedValue(0);
  const yGuardado = useSharedValue(0);

  const pellizco = Gesture.Pinch()
    .onUpdate((e) => {
      escala.value = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, escalaGuardada.value * e.scale));
    })
    .onEnd(() => {
      escalaGuardada.value = escala.value;
    });

  const rotacion = Gesture.Rotation()
    .onUpdate((e) => {
      giro.value = giroGuardado.value + e.rotation;
    })
    .onEnd(() => {
      giroGuardado.value = giro.value;
    });

  const arrastre = Gesture.Pan()
    .onUpdate((e) => {
      x.value = xGuardado.value + e.translationX;
      y.value = yGuardado.value + e.translationY;
    })
    .onEnd(() => {
      xGuardado.value = x.value;
      yGuardado.value = y.value;
    });

  const gesto = Gesture.Simultaneous(pellizco, rotacion, arrastre);

  const estiloMarco = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: escala.value },
      { rotate: `${giro.value}rad` },
    ],
  }));

  // Botones: alternativa para el navegador del PC, donde no hay dos dedos.
  const zoom = (factor: number) => {
    const siguiente = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, escalaGuardada.value * factor));
    escalaGuardada.value = siguiente;
    escala.value = withSpring(siguiente);
  };

  const girar = () => {
    const siguiente = giroGuardado.value + Math.PI / 4;
    giroGuardado.value = siguiente;
    giro.value = withSpring(siguiente);
  };

  const restablecer = () => {
    escalaGuardada.value = 1;
    giroGuardado.value = 0;
    xGuardado.value = 0;
    yGuardado.value = 0;
    escala.value = withSpring(1);
    giro.value = withSpring(0);
    x.value = withSpring(0);
    y.value = withSpring(0);
  };

  return (
    <Lienzo
      title="Gestos multitáctiles"
      hint="Con dos dedos acerca, aleja y gira la foto; con uno, muévela. En el PC usa los botones."
      accent={colors.mint}
      wash="#D8F6EF"
    >
      <Escenario onLayout={(e) => setAnchoEscenario(e.nativeEvent.layout.width)}>
        {anchoEscenario > 0 ? (
          <GestureDetector gesture={gesto}>
            <Animated.View style={[styles.marco, estiloMarco]}>
              <Image
                source={require('../../assets/dog.jpg')}
                style={{ width: anchoFoto, height: altoFoto, borderRadius: 10 }}
                resizeMode="cover"
              />
            </Animated.View>
          </GestureDetector>
        ) : null}
        <View style={styles.controles}>
          <BotonPastilla label="Acercar" icon="plus" color={colors.mint} onPress={() => zoom(1.3)} />
          <BotonPastilla label="Alejar" icon="minus" color={colors.mint} onPress={() => zoom(1 / 1.3)} />
          <BotonPastilla label="Girar" icon="rotate-right" color={colors.mint} onPress={girar} />
          <BotonPastilla label="Restablecer" icon="arrow-collapse-all" color={colors.ink} onPress={restablecer} />
        </View>
      </Escenario>
    </Lienzo>
  );
}

const styles = StyleSheet.create({
  // Marco tipo foto instantánea.
  marco: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    paddingBottom: 30,
    borderRadius: 18,
    shadowColor: colors.mint,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  controles: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
});
