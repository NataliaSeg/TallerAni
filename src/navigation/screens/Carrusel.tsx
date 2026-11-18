import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Escenario, Lienzo } from '../../components/Lienzo';
import { colors } from '../../estilos';

type Tarjeta = { id: string; emoji: string; titulo: string; texto: string; color: string };

const TARJETAS: Tarjeta[] = [
  { id: '1', emoji: '🌸', titulo: '', texto: '', color: colors.rose },
  { id: '2', emoji: '🦋', titulo: '', texto: '', color: colors.lilac },
  { id: '3', emoji: '🍃', titulo: '', texto: '', color: colors.mint },
  { id: '4', emoji: '🍓', titulo: '', texto: '', color: colors.peach },
  { id: '5', emoji: '🌷', titulo: '', texto: '', color: colors.sky },
];

const SEPARACION = 16;

// En web, el ajuste al centro lo hace CSS (snapToInterval solo funciona en nativo).
const ajusteListaWeb = Platform.OS === 'web' ? ({ scrollSnapType: 'x mandatory' } as any) : null;
const ajusteItemWeb = Platform.OS === 'web' ? ({ scrollSnapAlign: 'center' } as any) : null;

function Ficha({
  item,
  indice,
  desplazamiento,
  ancho,
}: {
  item: Tarjeta;
  indice: number;
  desplazamiento: SharedValue<number>;
  ancho: number;
}) {
  const paso = ancho + SEPARACION;

  const estilo = useAnimatedStyle(() => {
    const entrada = [(indice - 1) * paso, indice * paso, (indice + 1) * paso];
    return {
      opacity: interpolate(desplazamiento.value, entrada, [0.55, 1, 0.55], Extrapolation.CLAMP),
      transform: [
        { translateY: interpolate(desplazamiento.value, entrada, [26, 0, 26], Extrapolation.CLAMP) },
        { scale: interpolate(desplazamiento.value, entrada, [0.8, 1, 0.8], Extrapolation.CLAMP) },
        { rotateZ: `${interpolate(desplazamiento.value, entrada, [10, 0, -10], Extrapolation.CLAMP)}deg` },
      ],
    };
  });

  return (
    <View style={[{ width: paso, alignItems: 'center' }, ajusteItemWeb]}>
      {/* Tarjeta en forma de arco */}
      <Animated.View
        style={[
          styles.ficha,
          { width: ancho, backgroundColor: item.color, borderTopLeftRadius: ancho / 2, borderTopRightRadius: ancho / 2 },
          estilo,
        ]}
      >
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View>
          <Text style={styles.numero}>{`0${indice + 1}`}</Text>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.texto}>{item.texto}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

function Punto({ indice, desplazamiento, paso }: { indice: number; desplazamiento: SharedValue<number>; paso: number }) {
  const estilo = useAnimatedStyle(() => {
    const entrada = [(indice - 1) * paso, indice * paso, (indice + 1) * paso];
    return {
      width: interpolate(desplazamiento.value, entrada, [8, 22, 8], Extrapolation.CLAMP),
      opacity: interpolate(desplazamiento.value, entrada, [0.3, 1, 0.3], Extrapolation.CLAMP),
    };
  });
  return <Animated.View style={[styles.punto, estilo]} />;
}

export function Carrusel() {
  const [anchoEscenario, setAnchoEscenario] = useState(0);
  const desplazamiento = useSharedValue(0);
  const lista = useRef<FlatList<Tarjeta>>(null);

  const ancho = Math.min(270, Math.max(190, anchoEscenario * 0.6));
  const paso = ancho + SEPARACION;
  const relleno = Math.max(0, (anchoEscenario - paso) / 2);

  const alDesplazar = useAnimatedScrollHandler((e) => {
    desplazamiento.value = e.contentOffset.x;
  });

  const ir = (delta: number) => {
    const actual = Math.round(desplazamiento.value / paso);
    const siguiente = Math.min(TARJETAS.length - 1, Math.max(0, actual + delta));
    lista.current?.scrollToOffset({ offset: siguiente * paso, animated: true });
  };

  return (
    <Lienzo
      title="Carrusel"
      hint="Desliza hacia los lados o usa las flechas. La tarjeta central crece y las demás se inclinan."
      accent={colors.sky}
      wash="#DBEDFF"
    >
      <Escenario onLayout={(e) => setAnchoEscenario(e.nativeEvent.layout.width)} style={styles.escenario}>
        {anchoEscenario > 0 ? (
          <Animated.FlatList
            ref={lista as React.Ref<any>}
            data={TARJETAS}
            keyExtractor={(t: Tarjeta) => t.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={paso}
            decelerationRate="fast"
            scrollEventThrottle={16}
            onScroll={alDesplazar}
            contentContainerStyle={{ paddingHorizontal: relleno, alignItems: 'center' }}
            style={[styles.lista, ajusteListaWeb]}
            renderItem={({ item, index }: { item: Tarjeta; index: number }) => (
              <Ficha item={item} indice={index} desplazamiento={desplazamiento} ancho={ancho} />
            )}
          />
        ) : null}

        <View style={styles.pie}>
          <Pressable onPress={() => ir(-1)} accessibilityRole="button" accessibilityLabel="Tarjeta anterior" style={styles.flecha}>
            <MaterialCommunityIcons name="chevron-left" size={26} color={colors.sky} />
          </Pressable>
          <View style={styles.puntos}>
            {TARJETAS.map((t, i) => (
              <Punto key={t.id} indice={i} desplazamiento={desplazamiento} paso={paso} />
            ))}
          </View>
          <Pressable onPress={() => ir(1)} accessibilityRole="button" accessibilityLabel="Tarjeta siguiente" style={styles.flecha}>
            <MaterialCommunityIcons name="chevron-right" size={26} color={colors.sky} />
          </Pressable>
        </View>
      </Escenario>
    </Lienzo>
  );
}

const styles = StyleSheet.create({
  escenario: { justifyContent: 'flex-start' },
  // width: '100%' es clave: sin él, en web la lista crece al ancho de todas las tarjetas y no hay scroll.
  lista: { width: '100%', flexGrow: 0, marginTop: 14 },
  ficha: {
    height: 340,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    padding: 22,
    paddingTop: 36,
    justifyContent: 'space-between',
  },
  emoji: { fontSize: 66, textAlign: 'center' },
  numero: { fontSize: 13, fontWeight: '800', color: 'rgba(255,255,255,0.75)', letterSpacing: 1 },
  titulo: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.4 },
  texto: { marginTop: 4, fontSize: 14, lineHeight: 20, color: 'rgba(255,255,255,0.95)' },
  pie: { position: 'absolute', bottom: 8, flexDirection: 'row', alignItems: 'center', gap: 14 },
  flecha: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  puntos: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  punto: { height: 8, borderRadius: 4, backgroundColor: colors.sky },
});
