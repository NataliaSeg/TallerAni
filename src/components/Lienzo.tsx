import React from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, tint } from '../estilos';

type LienzoProps = {
  title: string;
  hint: string;
  accent: string;
  wash: string;
  children: React.ReactNode;
};

/**
 * Marco de cada ejercicio: fondo de color a pantalla completa, etiqueta con el título
 * arriba y un panel con la instrucción abajo.
 */
export function Lienzo({ title, hint, accent, wash, children }: LienzoProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: wash }]}>
      <View pointerEvents="none" style={[styles.blob, styles.blobA, { backgroundColor: tint(accent, '26') }]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobB, { backgroundColor: tint(accent, '1A') }]} />

      <View style={styles.chipRow}>
        <View style={[styles.chip, { backgroundColor: accent }]}>
          <Text style={styles.chipText}>{title}</Text>
        </View>
      </View>

      <View style={styles.content}>{children}</View>

      <View style={[styles.panel, { paddingBottom: 20 + insets.bottom }]}>
        <View style={[styles.handle, { backgroundColor: tint(accent, '66') }]} />
        <Text style={styles.hint}>{hint}</Text>
      </View>
    </View>
  );
}

type EscenarioProps = {
  children: React.ReactNode;
  onLayout?: (e: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
};

/** Zona libre (sin tarjeta) donde ocurre la animación. */
export function Escenario({ children, onLayout, style }: EscenarioProps) {
  return (
    <View onLayout={onLayout} style={[styles.stage, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
  blob: { position: 'absolute', borderRadius: 999 },
  blobA: { width: 280, height: 280, top: -90, right: -80 },
  blobB: { width: 220, height: 220, bottom: 140, left: -100 },
  chipRow: { paddingHorizontal: 20, paddingTop: 4, alignItems: 'flex-start' },
  chip: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 999 },
  chipText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: -0.2 },
  content: { flex: 1, width: '100%', maxWidth: 900, alignSelf: 'center' },
  stage: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  panel: {
    backgroundColor: colors.paper,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 26,
    paddingTop: 12,
    alignItems: 'center',
  },
  handle: { width: 44, height: 5, borderRadius: 3, marginBottom: 12 },
  hint: {
    maxWidth: 640,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: colors.ink,
  },
});
