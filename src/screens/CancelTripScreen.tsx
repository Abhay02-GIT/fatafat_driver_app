import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const RED = '#ef4444';
const REASONS = ["Rider didn't show up", 'Wrong location', 'Vehicle issue', 'Safety concern'];

export default function CancelTripScreen({ navigation }: RootScreenProps<'CancelTrip'>) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.map} />
      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <ThemedText type="subtitle" style={styles.white}>
          Cancel Trip
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          Please let us know why you are canceling. Frequent cancellations may affect your
          acceptance rate.
        </ThemedText>

        {REASONS.map((reason) => (
          <TouchableOpacity key={reason} style={styles.reasonRow} onPress={() => setSelected(reason)}>
            <View style={[styles.radio, selected === reason && styles.radioSelected]} />
            <ThemedText style={styles.white}>{reason}</ThemedText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.confirmButton, !selected && styles.confirmButtonDisabled]}
          disabled={!selected}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] })}>
          <ThemedText style={styles.confirmText}>CONFIRM CANCELLATION</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ThemedText themeColor="textSecondary" style={styles.keepText}>
            KEEP TRIP
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  map: { flex: 1 },
  sheet: {
    backgroundColor: '#141517',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2E3135',
    alignSelf: 'center',
  },
  reasonRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
    backgroundColor: '#0B0B0C',
    borderRadius: 10,
    padding: Spacing.three,
  },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: '#60646C' },
  radioSelected: { borderColor: RED, backgroundColor: RED },
  confirmButton: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  confirmButtonDisabled: { opacity: 0.5 },
  confirmText: { color: '#ffffff', fontWeight: '700' },
  keepText: { textAlign: 'center' },
});