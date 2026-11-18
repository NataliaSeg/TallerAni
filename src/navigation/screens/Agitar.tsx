import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BotonPastilla } from '../../components/BotonPastilla';
import { Escenario, Lienzo } from '../../components/Lienzo';
import { colors, tint } from '../../estilos';

// Umbral de sacudida: diferencia entre la fuerza medida y la gravedad (1 g).
const UMBRAL = 0.9;
const ENFRIAMIENTO_MS = 700;

export function Agitar() {
  const giro = useSharedValue(0);
  const desplazamientoX = useSharedValue(0);
  const aplastar = useSharedValue(1);
  const medidor = useSharedValue(0);
  const [disponible, setDisponible] = useState<boolean | null>(null);

  const agitar = useCallback(() => {
    
    giro.value = withSequence(
      withTiming(-16, { duration: 60 }),
      withRepeat(withTiming(16, { duration: 100 }), 6, true),
      withSpring(0, { damping: 6 })
    );
    desplazamientoX.value = withSequence(
      withTiming(-14, { duration: 60 }),
      withRepeat(withTiming(14, { duration: 100 }), 6, true),
      withSpring(0, { damping: 6 })
    );
    aplastar.value = withSequence(withTiming(0.9, { duration: 120 }), withSpring(1, { damping: 4 }));
  }, [giro, desplazamientoX, aplastar]);

  useEffect(() => {
    let suscripcion: { remove: () => void } | null = null;
    let cancelado = false;
    let ultima = 0;

    (async () => {
      const ok = await Accelerometer.isAvailableAsync();
      if (cancelado) return;
      setDisponible(ok);
      if (!ok) return;

      Accelerometer.setUpdateInterval(80);
      suscripcion = Accelerometer.addListener(({ x, y, z }) => {
        const fuerza = Math.abs(Math.sqrt(x * x + y * y + z * z) - 1);
        medidor.value = withTiming(Math.min(1, fuerza / 2), { duration: 80 });
        const ahora = Date.now();
        if (fuerza > UMBRAL && ahora - ultima > ENFRIAMIENTO_MS) {
          ultima = ahora;
          agitar();
        }
      });
    })();

    return () => {
      cancelado = true;
      suscripcion?.remove();
    };
  }, [medidor, agitar]);

  const estiloFigura = useAnimatedStyle(() => ({
    transform: [
      { translateX: desplazamientoX.value },
      { rotate: `${giro.value}deg` },
      { scale: aplastar.value },
    ],
  }));

  const estiloMedidor = useAnimatedStyle(() => ({ width: `${medidor.value * 100}%` }));

  const estado =
    disponible === null
      ? 'Buscando el acelerómetro…'
      : disponible
        ? 'Acelerómetro activo: sacude el celular.'
        : 'Este equipo no tiene acelerómetro. Usa el botón para ver la animación.';

  return (
    <Lienzo
      title="Sacudir el celular"
      hint="El acelerómetro detecta la sacudida y el celular de la pantalla se agita."
      accent={colors.orchid}
      wash="#F5DCFA"
    >
      <Escenario>
        <Animated.View style={[styles.figura, estiloFigura]}>
          <MaterialCommunityIcons name="cellphone" size={96} color="#FFFFFF" />
        </Animated.View>

        <View style={styles.panel}>
          <Text style={styles.estado}>{estado}</Text>
          <View style={styles.pista}>
            <Animated.View style={[styles.relleno, estiloMedidor]} />
          </View>
          <View style={styles.fila}>

            <BotonPastilla label="Probar en Navegador" icon="sine-wave" color={colors.orchid} onPress={agitar} />
          </View>
        </View>
      </Escenario>
    </Lienzo>
  );
}

const styles = StyleSheet.create({
  figura: {
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: colors.orchid,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 110,
    shadowColor: colors.orchid,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  panel: { position: 'absolute', left: 18, right: 18, bottom: 8, gap: 10 },
  estado: { fontSize: 14, lineHeight: 20, color: colors.inkSoft },
  pista: { height: 10, borderRadius: 5, backgroundColor: '#FFFFFF', overflow: 'hidden' },
  relleno: { height: '100%', borderRadius: 5, backgroundColor: colors.orchid },
  fila: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  cuenta: { fontSize: 15, fontWeight: '800', color: colors.ink },
});
