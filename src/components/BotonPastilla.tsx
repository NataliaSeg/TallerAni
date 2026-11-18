import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, IconName } from '../estilos';

type Props = {
  label: string;
  onPress: () => void;
  color?: string;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
};

export function BotonPastilla({ label, onPress, color = colors.lilac, icon, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color, opacity: pressed ? 0.8 : 1 },
        style,
      ]}
    >
      {icon ? <MaterialCommunityIcons name={icon} size={18} color="#FFFFFF" /> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  label: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
