import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const ACCENT = '#22C55E';
const FILTERS = ['All', 'Trips', 'Documents', 'Earnings'] as const;
const GROUPS = ['TODAY', 'YESTERDAY'] as const;

type Filter = (typeof FILTERS)[number];

type Notification = {
  id: string;
  category: Exclude<Filter, 'All'>;
  group: (typeof GROUPS)[number];
  icon: string;
  title: string;
  time: string;
  body: string;
  action?: string;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    category: 'Documents',
    group: 'TODAY',
    icon: '⚠️',
    title: 'Document Expiring Soon',
    time: '2h ago',
    body: 'Your vehicle insurance policy is expiring in 3 days.',
    action: 'Update Now',
  },
  {
    id: 'n2',
    category: 'Earnings',
    group: 'TODAY',
    icon: '💳',
    title: 'Payout Processed',
    time: '5h ago',
    body: 'Your weekly earnings of ₹450.00 have been successfully deposited.',
  },
  {
    id: 'n3',
    category: 'Earnings',
    group: 'YESTERDAY',
    icon: '🎟️',
    title: 'New Incentive Available',
    time: 'Yesterday',
    body: 'Complete 10 trips this weekend during peak hours to earn an extra bonus.',
    action: 'View Details',
  },
  {
    id: 'n4',
    category: 'Trips',
    group: 'YESTERDAY',
    icon: '🧭',
    title: 'Trip Cancelled',
    time: 'Yesterday',
    body: 'The rider cancelled the trip to Rajpur Road. A cancellation fee applies.',
  },
];

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = NOTIFICATIONS.filter((n) => filter === 'All' || n.category === filter);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Notifications" showBell={false} />

        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, filter === f && styles.filterPillActive]}
              onPress={() => setFilter(f)}>
              <ThemedText type="small" style={{ color: filter === f ? '#0B0B0C' : '#ffffff' }}>
                {f}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {visible.length === 0 && (
          <ThemedText themeColor="textSecondary" style={styles.empty}>
            Nothing here yet.
          </ThemedText>
        )}

        {GROUPS.map((group) => {
          const items = visible.filter((n) => n.group === group);
          if (items.length === 0) return null;

          return (
            <View key={group} style={styles.group}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                {group}
              </ThemedText>
              {items.map((n) => (
                <View key={n.id} style={styles.card}>
                  <ThemedText style={styles.icon}>{n.icon}</ThemedText>
                  <View style={styles.cardBody}>
                    <View style={styles.titleRow}>
                      <ThemedText type="smallBold" style={styles.white}>
                        {n.title}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {n.time}
                      </ThemedText>
                    </View>
                    <ThemedText type="small" themeColor="textSecondary">
                      {n.body}
                    </ThemedText>
                    {n.action && (
                      <ThemedText type="small" style={styles.accent}>
                        {n.action}
                      </ThemedText>
                    )}
                  </View>
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
  accent: { color: ACCENT },
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
  card: {
    flexDirection: 'row',
    gap: Spacing.two,
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
    borderLeftWidth: 2,
    borderLeftColor: ACCENT,
  },
  icon: { fontSize: 18 },
  cardBody: { flex: 1, gap: 2 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between' },
});