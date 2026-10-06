import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const ACCENT = '#22C55E';

type Props = {
  current: number;
  total: number;
  label?: string;
};

export function ProgressSteps({ current, total, label }: Props) {
  return (
    <View style={styles.wrap}>
      {label && (
        <ThemedText type="smallBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <View style={styles.row}>
        {Array.from({ length: total }).map((_, i) => (
          <View key={i} style={[styles.bar, i < current ? styles.barActive : styles.barInactive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.one },
  label: { color: ACCENT },
  row: { flexDirection: 'row', gap: 6 },
  bar: { flex: 1, height: 4, borderRadius: 2 },
  barActive: { backgroundColor: ACCENT },
  barInactive: { backgroundColor: '#2E3135' },
});