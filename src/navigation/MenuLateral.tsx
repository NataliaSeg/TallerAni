import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, tint } from '../estilos';

export function MenuLateral(props: DrawerContentComponentProps) {
  const { state, descriptors, navigation } = props;

  return (
    <View style={styles.root}>
      <View style={styles.brand}>
        <Text style={styles.name}>TallerAni</Text>
        <Text style={styles.sub}>Taller de animaciones</Text>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const accent = options.drawerActiveTintColor ?? colors.rose;
          const tone = focused ? accent : colors.inkSoft;
          const label = typeof options.title === 'string' ? options.title : route.name;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityLabel={label}
              onPress={() => (focused ? navigation.closeDrawer() : navigation.navigate(route.name))}
              style={[styles.item, focused && { backgroundColor: tint(accent, '1F') }]}
            >
              <View style={[styles.bar, { backgroundColor: focused ? accent : 'transparent' }]} />
              {options.drawerIcon?.({ focused, color: tone, size: 22 })}
              <Text style={[styles.label, { color: tone }]}>{label}</Text>
            </Pressable>
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  brand: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 22,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.line,
  },
  name: { fontSize: 28, fontWeight: '800', letterSpacing: -0.7, color: colors.ink },
  sub: { marginTop: 2, fontSize: 14, color: colors.inkSoft },
  scroll: { paddingHorizontal: 12, paddingTop: 14 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    paddingRight: 16,
    borderRadius: 999,
    marginBottom: 4,
    overflow: 'hidden',
  },
  bar: { width: 5, height: 24, borderTopRightRadius: 3, borderBottomRightRadius: 3 },
  label: { fontSize: 16, fontWeight: '700' },
});
