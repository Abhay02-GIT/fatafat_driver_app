import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';
const RED = '#ef4444';
const REQUEST_SECONDS = 30;

export default function CarpoolTripRequestScreen({
  navigation,
}: RootScreenProps<'CarpoolTripRequest'>) {
  const [secondsLeft, setSecondsLeft] = useState(REQUEST_SECONDS);
  const countdownColor = secondsLeft <= 5 ? RED : AMBER;

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigation.replace('RequestExpired');
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <ThemedText style={styles.headerIcon}>🚗</ThemedText>
        <ThemedText type="subtitle" style={styles.white}>
          Online
        </ThemedText>
        <ThemedText style={styles.accent}>Online</ThemedText>
      </SafeAreaView>

      <View style={styles.map} />

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.top}>
          <View style={styles.iconStack}>
            <ThemedText style={styles.headerIcon}>👥</ThemedText>
          </View>
          <View style={styles.flex}>
            <ThemedText type="subtitle" style={styles.white}>
              Carpool Request
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              +2 Extra Stops
            </ThemedText>
          </View>
          <View style={[styles.countdown, { borderColor: countdownColor }]}>
            <ThemedText type="subtitle" style={{ color: countdownColor }}>
              {secondsLeft}
            </ThemedText>
          </View>
        </View>

        <View style={styles.costCard}>
          <ThemedText type="small" themeColor="textSecondary">
            ESTIMATED COST-SHARE
          </ThemedText>
          <View style={styles.priceRow}>
            <ThemedText type="title" style={styles.white}>
              ₹185
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.strike}>
              ₹240
            </ThemedText>
          </View>
          <ThemedText type="small" style={styles.accent}>
            ↗ High demand area
          </ThemedText>
        </View>

        <View style={styles.row2}>
          <View style={styles.miniCard}>
            <ThemedText type="small" themeColor="textSecondary">
              Extra Time
            </ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              +12 min
            </ThemedText>
          </View>
          <View style={styles.miniCard}>
            <ThemedText type="small" themeColor="textSecondary">
              Total Distance
            </ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              8.4 km
            </ThemedText>
          </View>
        </View>

        <ThemedText type="small" themeColor="textSecondary">
          Passengers (3)
        </ThemedText>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.declineButton} onPress={() => navigation.goBack()}>
            <ThemedText style={styles.declineText}>Decline</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.replace('MultiStopManifest')}>
            <ThemedText style={styles.acceptText}>Accept ✓</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  headerIcon: { fontSize: 18 },
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
  top: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
  iconStack: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2E3135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdown: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  costCard: { backgroundColor: '#0B0B0C', borderRadius: 12, padding: Spacing.three, gap: 4 },
  priceRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'baseline' },
  strike: { textDecorationLine: 'line-through' },
  row2: { flexDirection: 'row', gap: Spacing.three },
  miniCard: { flex: 1, backgroundColor: '#0B0B0C', borderRadius: 10, padding: Spacing.two, gap: 4 },
  actionsRow: { flexDirection: 'row', gap: Spacing.three },
  declineButton: {
    flex: 1,
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  declineText: { color: '#ffffff', fontWeight: '700' },
  acceptButton: {
    flex: 1,
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  acceptText: { color: '#0B0B0C', fontWeight: '700' },
});