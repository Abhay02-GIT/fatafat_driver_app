import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';

type Stop = { id: string; name: string; address: string; boarded: boolean };

const FIRST_STOPS: Stop[] = [
  { id: 's1', name: 'Vikram', address: 'Rajpur Road, Jakhan', boarded: true },
  { id: 's2', name: 'Neha', address: 'Ballupur Chowk', boarded: false },
];

export default function MultiStopManifestScreen({
  navigation,
}: RootScreenProps<'MultiStopManifest'>) {
  const [stops, setStops] = useState(FIRST_STOPS);
  const allBoarded = stops.every((s) => s.boarded);

  function toggleStop(id: string) {
    setStops((list) => list.map((s) => (s.id === id ? { ...s, boarded: !s.boarded } : s)));
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.avatar} />
        <ThemedText type="subtitle" style={styles.accent}>
          Online
        </ThemedText>
        <ThemedText style={styles.bell}>🔔</ThemedText>
      </SafeAreaView>

      <View style={styles.map} />

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <ThemedText type="subtitle" style={styles.white}>
          Pickup Manifest ({stops.length})
        </ThemedText>

        {stops.map((s, i) => (
          <View key={s.id} style={styles.stopRow}>
            <View style={styles.numberCircle}>
              <ThemedText style={styles.white}>{i + 1}</ThemedText>
            </View>
            <View style={styles.stopText}>
              <ThemedText type="smallBold" style={styles.white}>
                {s.name}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Pickup: {s.address}
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PerStopCancellation', {
                  stopName: s.name,
                  stopInfo: `Stop ${i + 1} of ${stops.length} • ${s.address}`,
                })
              }>
              <ThemedText type="small" style={styles.cancelLink}>
                Cancel
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.togglePill, s.boarded ? styles.togglePillOn : styles.togglePillOff]}
              onPress={() => toggleStop(s.id)}
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.confirmButton, allBoarded && styles.confirmButtonActive]}
          disabled={!allBoarded}
          onPress={() => navigation.replace('ActiveNavigation')}>
          <ThemedText style={{ color: allBoarded ? '#0B0B0C' : '#60646C', fontWeight: '700' }}>
            Confirm Boarded
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2E3135' },
  bell: { fontSize: 20 },
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
  stopRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2E3135',
    paddingVertical: Spacing.two,
  },
  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E3135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopText: { flex: 1 },
  cancelLink: { color: '#ef4444' },
  togglePill: { width: 44, height: 24, borderRadius: 12 },
  togglePillOn: { backgroundColor: ACCENT },
  togglePillOff: { backgroundColor: AMBER },
  confirmButton: {
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  confirmButtonActive: { backgroundColor: ACCENT },
});