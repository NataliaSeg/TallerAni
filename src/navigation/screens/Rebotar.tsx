import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Escenario, Lienzo } from '../../components/Lienzo';
import { colors } from '../../estilos';

export function Rebotar() {
  const escala = useSharedValue(1);

  const estilo = useAnimatedStyle(() => ({
    transform: [{ scale: escala.value }],
  }));

  const alPresionar = () => {
    escala.value = withTiming(0.6, { duration: 140 });
  };

  const alSoltar = () => {
    // Un resorte con poco amortiguamiento genera el rebote.
    escala.value = withSpring(1, { damping: 4, stiffness: 170, mass: 0.7 });
    
  };

  return (
    <Lienzo
      title="Rebote"
      hint="Mantén presionada la figura para encogerla y suéltala para verla rebotar."
      accent={colors.peach}
      wash="#FFE5D8"
    >
      <Escenario>
        <Pressable onPressIn={alPresionar} onPressOut={alSoltar} accessibilityRole="button" accessibilityLabel="Figura que rebota">
          <Animated.View style={[styles.figura, estilo]}>
            <View style={styles.anillo}>
              <MaterialCommunityIcons name="emoticon-happy-outline" size={88} color="#FFFFFF" />
            </View>
          </Animated.View>
        </Pressable>

      </Escenario>
    </Lienzo>
  );
}

const styles = StyleSheet.create({
  figura: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.peach,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.peach,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    cursor: 'pointer',
  } as any,
  anillo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
