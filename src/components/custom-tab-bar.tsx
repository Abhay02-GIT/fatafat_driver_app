import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const ACCENT = '#22C55E';

const ICONS: Record<string, string> = {
  Home: '🏠',
  Trips: '🚗',
  Earnings: '💳',
  Account: '👤',
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const label = descriptors[route.key].options.title ?? route.name;
          const isFocused = state.index === index;

          function onPress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <TouchableOpacity key={route.key} style={styles.tab} onPress={onPress}>
              <ThemedText style={[styles.icon, { opacity: isFocused ? 1 : 0.5 }]}>
                {ICONS[route.name] ?? '•'}
              </ThemedText>
              <ThemedText type="small" style={{ color: isFocused ? ACCENT : '#60646C' }}>
                {label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#0B0B0C', borderTopWidth: 1, borderTopColor: '#2E3135' },
  row: { flexDirection: 'row' },
  tab: { flex: 1, alignItems: 'center', gap: 2, paddingVertical: Spacing.two },
  icon: { fontSize: 20 },
});