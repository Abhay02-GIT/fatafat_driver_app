import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const RED = '#ef4444';
const REQUEST_SECONDS = 30;

export default function IncomingRequestScreen({
  navigation,
}: RootScreenProps<'IncomingRequest'>) {
  const [secondsLeft, setSecondsLeft] = useState(REQUEST_SECONDS);
  const countdownColor = secondsLeft <= 5 ? RED : ACCENT;

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
        <View style={styles.avatar} />
        <ThemedText type="subtitle" style={styles.white}>
          Online
        </ThemedText>
        <ThemedText style={styles.bell}>🔔</ThemedText>
      </SafeAreaView>

      <View style={styles.map} />

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.requestTop}>
          <View>
            <ThemedText type="smallBold" style={styles.accent}>
              INCOMING REQUEST
            </ThemedText>
            <ThemedText type="title" style={styles.white}>
              ₹{trip.fare}
            </ThemedText>
          </View>
          <View style={[styles.countdownCircle, { borderColor: countdownColor }]}>
            <ThemedText type="subtitle" style={{ color: countdownColor }}>
              {secondsLeft}
            </ThemedText>
          </View>
        </View>

        <View style={styles.routeBox}>
          <View style={styles.routeRow}>
            <View style={styles.dotWhite} />
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                Pickup • {trip.pickupDistanceKm} km away
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                {trip.pickupArea}
              </ThemedText>
            </View>
          </View>
          <View style={styles.routeRow}>
            <View style={styles.dotOrange} />
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                Drop-off
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                {trip.dropArea}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.declineButton} onPress={() => navigation.goBack()}>
            <ThemedText style={styles.declineText}>Decline</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.replace('TripAcceptedSummary')}>
            <ThemedText style={styles.acceptText}>Accept</ThemedText>
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
  requestTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  countdownCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeBox: { gap: Spacing.two },
  routeRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  dotWhite: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ffffff' },
  dotOrange: { width: 10, height: 10, borderRadius: 2, backgroundColor: '#F59E0B' },
  actionsRow: { flexDirection: 'row', gap: Spacing.three },
  declineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2E3135',
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