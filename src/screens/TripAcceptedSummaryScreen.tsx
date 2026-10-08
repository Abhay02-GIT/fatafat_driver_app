import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';

export default function TripAcceptedSummaryScreen({
  navigation,
}: RootScreenProps<'TripAcceptedSummary'>) {
  const firstName = trip.rider.split(' ')[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Trip Summary" showBell={false} />

      <View style={styles.successPill}>
        <ThemedText style={styles.successText}>✓ Trip Accepted Successfully</ThemedText>
      </View>

      <View style={styles.map}>
        <ThemedText style={styles.mapDistance}>{trip.pickupDistanceKm} km</ThemedText>
      </View>

      <View style={styles.riderCard}>
        <View style={styles.riderTop}>
          <View>
            <ThemedText type="smallBold" style={styles.white}>
              {trip.rider}
            </ThemedText>
            <ThemedText type="small" style={{ color: AMBER }}>
              ⭐ {trip.rating}
            </ThemedText>
          </View>
          <View style={styles.alignEnd}>
            <ThemedText type="smallBold" style={styles.white}>
              ₹{trip.fare}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {trip.payment}
            </ThemedText>
          </View>
        </View>

        <View style={styles.routeBox}>
          <View style={styles.routeRow}>
            <ThemedText style={styles.accent}>●</ThemedText>
            <View style={styles.flex}>
              <View style={styles.routeTopRow}>
                <ThemedText type="small" style={styles.accent}>
                  PICKUP ({trip.pickupDistanceKm} KM AWAY)
                </ThemedText>
                <ThemedText type="small" style={styles.accent}>
                  {trip.pickupEtaMin} min ETA
                </ThemedText>
              </View>
              <ThemedText type="smallBold" style={styles.white}>
                {trip.pickupAddress}
              </ThemedText>
            </View>
          </View>
          <View style={styles.routeRow}>
            <ThemedText style={{ color: AMBER }}>■</ThemedText>
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                DROP-OFF
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                {trip.dropAddress}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Calling')}>
            <ThemedText style={styles.white}>📞 Call {firstName} (Masked)</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Chat')}>
            <ThemedText style={styles.white}>💬 Chat</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('CancelTrip')}>
          <ThemedText style={styles.cancelText}>Cancel Trip</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startNavButton}
          onPress={() => navigation.replace('EnRoutePickup')}>
          <ThemedText style={styles.startNavText}>➤ Start Navigation</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C', paddingHorizontal: Spacing.four, gap: Spacing.three },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  flex: { flex: 1 },
  alignEnd: { alignItems: 'flex-end' },
  successPill: {
    alignSelf: 'center',
    backgroundColor: '#0f2a17',
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderWidth: 1,
    borderColor: ACCENT,
  },
  successText: { color: ACCENT, fontWeight: '700' },
  map: { flex: 1, minHeight: 140, alignItems: 'center', justifyContent: 'center' },
  mapDistance: {
    color: '#ffffff',
    backgroundColor: '#141517',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  riderCard: {
    backgroundColor: '#141517',
    borderRadius: 16,
    padding: Spacing.three,
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  riderTop: { flexDirection: 'row', justifyContent: 'space-between' },
  routeBox: {
    gap: Spacing.two,
    backgroundColor: '#0B0B0C',
    borderRadius: 12,
    padding: Spacing.three,
  },
  routeRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'flex-start' },
  routeTopRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionsRow: { flexDirection: 'row', gap: Spacing.two },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#2E3135',
    borderRadius: 10,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  cancelText: { color: '#ffffff', fontWeight: '700' },
  startNavButton: { alignItems: 'center', paddingVertical: Spacing.one },
  startNavText: { color: ACCENT, fontWeight: '700' },
});