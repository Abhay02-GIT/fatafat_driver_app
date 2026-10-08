import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';
const RED = '#ef4444';

const PAYOUT = {
  range: 'Sep 28 - Oct 04, 2026',
  bank: 'HDFC Bank •••• 4829',
  date: 'Oct 6, 2:15 AM',
  grossFares: 880,
  tripsCompleted: 36,
  tips: 100,
  serviceFee: 176,
  surgeBonus: 41.5,
  status: 'Processing',
  initiated: 'Oct 5, 2026 - 4:00 AM',
  utr: 'HDFC-99823-XYZ-11',
};

function TxRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.txRow}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      {children}
    </View>
  );
}

export default function PayoutDetailScreen() {
  const amount = PAYOUT.grossFares + PAYOUT.tips - PAYOUT.serviceFee + PAYOUT.surgeBonus;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Weekly Payout" showBell={false} />

        <View style={styles.summaryCard}>
          <ThemedText type="small" themeColor="textSecondary">
            {PAYOUT.range}
          </ThemedText>
          <ThemedText type="title" style={styles.accent}>
            ₹{amount.toFixed(2)}
          </ThemedText>
          <View style={styles.bankPill}>
            <ThemedText type="small" themeColor="textSecondary">
              🏦 {PAYOUT.bank}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {PAYOUT.date}
            </ThemedText>
          </View>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.rowIcon}>🚗</ThemedText>
          <ThemedText style={styles.rowLabel}>Gross Fares</ThemedText>
          <ThemedText type="smallBold" style={styles.white}>
            ₹{PAYOUT.grossFares.toFixed(2)}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary" style={styles.rowNote}>
          {PAYOUT.tripsCompleted} Trips completed
        </ThemedText>

        <View style={styles.row}>
          <ThemedText style={[styles.rowIcon, styles.accent]}>♥</ThemedText>
          <ThemedText style={styles.rowLabel}>Tips</ThemedText>
          <ThemedText type="smallBold" style={styles.accent}>
            +₹{PAYOUT.tips.toFixed(2)}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary" style={styles.rowNote}>
          100% goes directly to you
        </ThemedText>

        <ThemedText type="smallBold" style={[styles.white, styles.sectionTitle]}>
          Deductions & Adjustments
        </ThemedText>
        <View style={styles.deductRow}>
          <View style={[styles.deductDot, { backgroundColor: RED }]} />
          <View style={styles.deductText}>
            <ThemedText style={styles.white}>Platform Service Fee</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              20% commission on gross fares
            </ThemedText>
          </View>
          <ThemedText style={{ color: RED }}>-₹{PAYOUT.serviceFee.toFixed(2)}</ThemedText>
        </View>
        <View style={styles.deductRow}>
          <View style={[styles.deductDot, { backgroundColor: AMBER }]} />
          <View style={styles.deductText}>
            <ThemedText style={styles.white}>Surge / Fare-Match</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              High demand area bonus
            </ThemedText>
          </View>
          <ThemedText style={{ color: AMBER }}>+₹{PAYOUT.surgeBonus.toFixed(2)}</ThemedText>
        </View>

        <ThemedText type="smallBold" style={[styles.white, styles.sectionTitle]}>
          Transaction Details
        </ThemedText>
        <TxRow label="Status">
          <View style={styles.statusPill}>
            <ThemedText type="small" style={styles.statusText}>
              {PAYOUT.status}
            </ThemedText>
          </View>
        </TxRow>
        <TxRow label="Initiated">
          <ThemedText type="small" style={styles.white}>
            {PAYOUT.initiated}
          </ThemedText>
        </TxRow>
        <TxRow label="UTR / Ref Number">
          <ThemedText type="small" style={styles.white}>
            {PAYOUT.utr}
          </ThemedText>
        </TxRow>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.two, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  summaryCard: {
    backgroundColor: '#0f2a17',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  bankPill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0B0B0C',
    borderRadius: 10,
    padding: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
    marginTop: Spacing.two,
  },
  rowIcon: { fontSize: 16 },
  rowLabel: { color: '#ffffff', flex: 1 },
  rowNote: { marginLeft: 28 },
  sectionTitle: { marginTop: Spacing.two },
  deductRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
  },
  deductDot: { width: 24, height: 24, borderRadius: 12 },
  deductText: { flex: 1 },
  txRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statusPill: {
    backgroundColor: AMBER,
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  statusText: { color: '#0B0B0C', fontWeight: '700' },
});