import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const ACCENT = '#22C55E';
const WEEK_TOTAL = 12450;

const FILTERS = [
  { label: 'All Activity', kind: null },
  { label: 'Trips', kind: 'trip' },
  { label: 'Incentives', kind: 'incentive' },
  { label: 'Adjustments', kind: 'adjustment' },
];

const GROUPS = ['Today', 'Yesterday, Oct 6'];

type Entry = {
  id: string;
  group: string;
  kind: string;
  icon: string;
  title: string;
  sub: string;
  amount: number;
  credit?: boolean;
};

const ENTRIES: Entry[] = [
  { id: 'a1', group: 'Today', kind: 'trip', icon: '🚗', title: 'Trip • ID 8492A', sub: '2:15 PM • Cab', amount: 520 },
  { id: 'a2', group: 'Today', kind: 'trip', icon: '🏍️', title: 'Trip • ID 8491B', sub: '12:40 PM • Bike', amount: 410 },
  { id: 'a3', group: 'Today', kind: 'trip', icon: '🏍️', title: 'Trip • ID 8490C', sub: '9:05 AM • Bike', amount: 310 },
  { id: 'a4', group: 'Yesterday, Oct 6', kind: 'incentive', icon: '⭐', title: 'Peak Hour Incentive', sub: '5:00 PM', amount: 150, credit: true },
  { id: 'a5', group: 'Yesterday, Oct 6', kind: 'trip', icon: '🚗', title: 'Trip • ID 8480X', sub: '4:45 PM • Cab', amount: 455 },
  { id: 'a6', group: 'Yesterday, Oct 6', kind: 'adjustment', icon: '🧾', title: 'Toll Refund', sub: '6:10 PM', amount: 40, credit: true },
];

export default function EarningsActivityScreen() {
  const [filter, setFilter] = useState('All Activity');
  const activeKind = FILTERS.find((f) => f.label === filter)?.kind;
  const visible = ENTRIES.filter((e) => !activeKind || e.kind === activeKind);
  const todayTotal = ENTRIES.filter((e) => e.group === 'Today').reduce((sum, e) => sum + e.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Rider" />

        <ThemedText type="small" themeColor="textSecondary">
          Oct 5 - Oct 11
        </ThemedText>
        <ThemedText type="title" style={styles.white}>
          ₹{WEEK_TOTAL.toLocaleString('en-IN')}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Total earnings this week
        </ThemedText>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {FILTERS.map((f) => {
              const active = filter === f.label;
              return (
                <TouchableOpacity
                  key={f.label}
                  style={[styles.filterPill, active && styles.filterPillActive]}
                  onPress={() => setFilter(f.label)}>
                  <ThemedText type="small" style={{ color: active ? '#0B0B0C' : '#ffffff' }}>
                    {active ? '✓ ' : ''}
                    {f.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {visible.length === 0 && (
          <ThemedText themeColor="textSecondary" style={styles.empty}>
            No activity to show.
          </ThemedText>
        )}

        {GROUPS.map((group) => {
          const entries = visible.filter((e) => e.group === group);
          if (entries.length === 0) return null;

          return (
            <View key={group} style={styles.group}>
              <View style={styles.groupHeader}>
                <ThemedText type="smallBold" style={styles.white}>
                  {group}
                </ThemedText>
                {group === 'Today' && (
                  <ThemedText type="smallBold" style={styles.white}>
                    ₹{todayTotal.toFixed(2)}
                  </ThemedText>
                )}
              </View>
              {entries.map((e) => (
                <View key={e.id} style={styles.entryRow}>
                  <View style={styles.entryLeft}>
                    <ThemedText style={styles.entryIcon}>{e.icon}</ThemedText>
                    <View>
                      <ThemedText type="smallBold" style={styles.white}>
                        {e.title}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {e.sub}
                      </ThemedText>
                    </View>
                  </View>
                  <ThemedText type="smallBold" style={{ color: e.credit ? ACCENT : '#ffffff' }}>
                    {e.credit ? '+' : ''}₹{e.amount.toFixed(2)}
                  </ThemedText>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  filterRow: { flexDirection: 'row', gap: Spacing.two },
  filterPill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 16,
    backgroundColor: '#2E3135',
  },
  filterPillActive: { backgroundColor: ACCENT },
  empty: { textAlign: 'center', marginTop: Spacing.four },
  group: { gap: Spacing.two },
  groupHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
  },
  entryLeft: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  entryIcon: { fontSize: 18 },
});