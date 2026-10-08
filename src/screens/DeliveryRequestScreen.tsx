import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_PARCEL as parcel } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';
const RED = '#ef4444';
const REQUEST_SECONDS = 30;

export default function DeliveryRequestScreen({
  navigation,
}: RootScreenProps<'DeliveryRequest'>) {
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
      <SafeAreaView edges={['top']} style={styles.topArea}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <ThemedText style={styles.closeText}>✕</ThemedText>
        </TouchableOpacity>
        <View style={styles.parcelPill}>
          <ThemedText style={styles.white}>📦 PARCEL</ThemedText>
        </View>
      </SafeAreaView>

      <View style={styles.countdownWrap}>
        <View style={[styles.countdownCircle, { borderColor: countdownColor }]}>
          <ThemedText type="title" style={styles.white}>
            {secondsLeft}
          </ThemedText>
          <ThemedText type="small" style={styles.white}>
            SECONDS
          </ThemedText>
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <ThemedText type="small" themeColor="textSecondary">
          GUARANTEED DELIVERY FEE
        </ThemedText>
        <ThemedText type="title" style={styles.accent}>
          ₹{parcel.fee}
        </ThemedText>
        <View style={styles.commissionPill}>
          <ThemedText type="small" themeColor="textSecondary">
            Includes 18% Platform Commission
          </ThemedText>
        </View>

        <View style={styles.parcelRow}>
          <ThemedText>📦</ThemedText>
          <View style={styles.flex}>
            <ThemedText type="smallBold" style={styles.white}>
              {parcel.size}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Max 15 kg • Fragile
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Standard
          </ThemedText>
        </View>

        <View style={styles.routeRow}>
          <View style={styles.dotWhite} />
          <View>
            <ThemedText type="small" themeColor="textSecondary">
              PICKUP • 3 MIN AWAY (1.3 KM)
            </ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              {parcel.pickupAddress}
            </ThemedText>
          </View>
        </View>
        <View style={styles.routeRow}>
          <View style={styles.dotOrange} />
          <View>
            <ThemedText type="small" themeColor="textSecondary">
              DROPOFF • 14 MIN TRIP (4.2 KM)
            </ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              {parcel.dropAddress}
            </ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => navigation.replace('ParcelPickupVerification')}>
          <ThemedText style={styles.acceptText}>Accept Delivery →</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  flex: { flex: 1 },
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { color: '#ffffff', fontSize: 18 },
  parcelPill: {
    backgroundColor: '#2E3135',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  countdownWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  countdownCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    backgroundColor: '#0f2a17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    backgroundColor: '#141517',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2E3135',
    alignSelf: 'center',
  },
  commissionPill: {
    backgroundColor: '#0B0B0C',
    borderRadius: 10,
    padding: Spacing.two,
    alignSelf: 'flex-start',
  },
  parcelRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
    backgroundColor: '#0B0B0C',
    borderRadius: 10,
    padding: Spacing.three,
    marginTop: Spacing.two,
  },
  routeRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'flex-start' },
  dotWhite: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ffffff', marginTop: 4 },
  dotOrange: { width: 10, height: 10, borderRadius: 2, backgroundColor: AMBER, marginTop: 4 },
  acceptButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  acceptText: { color: '#0B0B0C', fontWeight: '700' },
});