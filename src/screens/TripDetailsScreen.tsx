import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const ACCENT = '#22C55E';
const RED = '#ef4444';

const TRIP = {
  date: 'Oct 6, 2:45 PM',
  rider: 'Neha S.',
  rating: 4.5,
  distance: '4.2 km',
  duration: '14 min',
  baseFare: 60,
  distanceFare: 159.6,
  timeFare: 125.9,
  platformFee: 69.1,
};

type ReceiptRowProps = {
  label: string;
  value: number;
  bold?: boolean;
  negative?: boolean;
  accent?: boolean;
};

function ReceiptRow({ label, value, bold, negative, accent }: ReceiptRowProps) {
  const color = negative ? RED : accent ? ACCENT : '#ffffff';
  const type = bold ? 'smallBold' : 'small';

  return (
    <View style={styles.receiptRow}>
      <ThemedText type={type} style={{ color }}>
        {label}
      </ThemedText>
      <ThemedText type={type} style={{ color }}>
        {negative ? '-' : ''}₹{Math.abs(value).toFixed(2)}
      </ThemedText>
    </View>
  );
}

export default function TripDetailsScreen() {
  const gross = TRIP.baseFare + TRIP.distanceFare + TRIP.timeFare;
  const net = gross - TRIP.platformFee;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Trip Details" showBell={false} />

        <View style={styles.mapPlaceholder}>
          <ThemedText type="small" themeColor="textSecondary">
            {TRIP.date}
          </ThemedText>
        </View>

        <View style={styles.riderRow}>
          <View style={styles.avatar} />
          <View style={styles.riderText}>
            <ThemedText type="smallBold" style={styles.white}>
              {TRIP.rider}
            </ThemedText>
            <ThemedText type="small" style={styles.rating}>
              ★ {TRIP.rating}
            </ThemedText>
          </View>
          <View style={styles.riderRight}>
            <ThemedText type="smallBold" style={styles.white}>
              {TRIP.distance}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {TRIP.duration}
            </ThemedText>
          </View>
        </View>

        <View style={styles.receiptCard}>
          <ThemedText type="smallBold" style={styles.white}>
            Receipt
          </ThemedText>
          <ReceiptRow label="Base Fare" value={TRIP.baseFare} />
          <ReceiptRow label={`Distance (${TRIP.distance})`} value={TRIP.distanceFare} />
          <ReceiptRow label={`Time (${TRIP.duration})`} value={TRIP.timeFare} />
          <View style={styles.divider} />
          <ReceiptRow label="Gross Earnings" value={gross} bold />
          <ReceiptRow label="Platform Fee" value={-TRIP.platformFee} negative />
          <View style={styles.divider} />
          <ReceiptRow label="Net Earning" value={net} bold accent />
        </View>

        <TouchableOpacity style={styles.helpButton}>
          <ThemedText style={styles.white}>🎧 Get Help with this Trip</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  rating: { color: '#F59E0B' },
  mapPlaceholder: {
    height: 160,
    borderRadius: 12,
    backgroundColor: '#141517',
    justifyContent: 'flex-end',
    padding: Spacing.two,
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
  },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2E3135' },
  riderText: { flex: 1 },
  riderRight: { alignItems: 'flex-end' },
  receiptCard: {
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between' },
  divider: { height: 1, backgroundColor: '#2E3135' },
  helpButton: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
});