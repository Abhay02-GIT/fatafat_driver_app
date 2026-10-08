import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const PINK = '#ec4899';
const GREEN = '#22C55E';
const REQUEST_SECONDS = 30;

export default function PinkScootyTripRequestScreen({
  navigation,
}: RootScreenProps<'PinkScootyTripRequest'>) {
  const [secondsLeft, setSecondsLeft] = useState(REQUEST_SECONDS);

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
        <ThemedText style={{ color: GREEN }}>● Online</ThemedText>
        <ThemedText type="subtitle" style={{ color: PINK }}>
          Pink Scooty
        </ThemedText>
      </SafeAreaView>

      <View style={styles.map}>
        <View style={styles.estimateChip}>
          <ThemedText style={styles.white}>📍 Estimated trip: 12 mins (4.2 km)</ThemedText>
        </View>
        <View style={styles.pickupPill}>
          <ThemedText style={styles.pillText}>PICKUP</ThemedText>
        </View>
        <View style={styles.dropPill}>
          <ThemedText style={styles.pillText}>DROP</ThemedText>
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.requestTop}>
          <View>
            <ThemedText type="smallBold" style={{ color: PINK }}>
              NEW TRIP REQUEST • {secondsLeft}s
            </ThemedText>
            <ThemedText type="subtitle" style={styles.white}>
              Pink Scooty Priority
            </ThemedText>
          </View>
          <View style={styles.womenOnlyPill}>
            <ThemedText type="small" style={styles.white}>
              📍 WOMEN ONLY
            </ThemedText>
          </View>
        </View>

        <View style={styles.riderRow}>
          <View style={styles.avatar} />
          <View style={styles.flex}>
            <ThemedText type="smallBold" style={styles.white}>
              Priya Sharma
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Rider rating: ⭐ 4.9 (240+ trips)
            </ThemedText>
          </View>
          <View style={styles.alignEnd}>
            <ThemedText type="smallBold" style={{ color: GREEN }}>
              ₹185
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Incl. Pink Bonus
            </ThemedText>
          </View>
        </View>

        <View style={styles.routeBox}>
          <View style={styles.routeRow}>
            <View style={[styles.dot, { backgroundColor: PINK }]} />
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                PICKUP FROM
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                Rajpur Road, Jakhan
              </ThemedText>
            </View>
          </View>
          <View style={styles.routeRow}>
            <View style={[styles.dot, { backgroundColor: GREEN }]} />
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                DROP OFF TO
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                Women's Wing, Doon Hospital
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.declineButton} onPress={() => navigation.goBack()}>
            <ThemedText style={styles.buttonText}>Decline</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.replace('FemaleRiderVerification')}>
            <ThemedText style={styles.buttonText}>👤 Accept Ride</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  flex: { flex: 1 },
  alignEnd: { alignItems: 'flex-end' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  map: { flex: 1, padding: Spacing.four, gap: Spacing.four },
  estimateChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.two,
  },
  pickupPill: {
    alignSelf: 'flex-start',
    backgroundColor: PINK,
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    marginTop: Spacing.four,
  },
  dropPill: {
    alignSelf: 'flex-end',
    backgroundColor: GREEN,
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
  },
  pillText: { color: '#ffffff', fontWeight: '700' },
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
  requestTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  womenOnlyPill: {
    backgroundColor: PINK,
    borderRadius: 12,
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
  },
  riderRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E3135',
    borderWidth: 2,
    borderColor: PINK,
  },
  routeBox: {
    gap: Spacing.two,
    backgroundColor: '#0B0B0C',
    borderRadius: 12,
    padding: Spacing.three,
  },
  routeRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'flex-start' },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  actionsRow: { flexDirection: 'row', gap: Spacing.three },
  declineButton: {
    flex: 1,
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: PINK,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontWeight: '700' },
});