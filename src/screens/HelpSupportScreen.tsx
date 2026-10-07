import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const GREEN = '#22C55E';
const RED = '#ef4444';

const CATEGORIES = [
  { icon: '🧭', label: 'Trip Issues', highlight: false },
  { icon: '💳', label: 'Earnings & Payouts', highlight: false },
  { icon: '👤', label: 'Account & Security', highlight: false },
  { icon: '🛡️', label: 'Safety & Emergency', highlight: true },
];

const ARTICLES = [
  'How do I update my vehicle information?',
  'Understanding my weekly payout statement',
  'Reporting a rude passenger',
];

export default function HelpSupportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Rider" />

        <ThemedText type="subtitle" style={styles.white}>
          Help & Support
        </ThemedText>
        <View style={styles.searchBox}>
          <ThemedText themeColor="textSecondary">🔍 Search for help...</ThemedText>
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText type="smallBold" style={styles.white}>
            Recent Trip
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            See All
          </ThemedText>
        </View>
        <View style={styles.tripCard}>
          <View style={styles.tripTop}>
            <ThemedText>🚗</ThemedText>
            <View style={styles.tripText}>
              <ThemedText type="smallBold" style={styles.white}>
                Clock Tower to Jolly Grant Airport
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Today, 2:30 PM • Trip #TRP-8921
              </ThemedText>
            </View>
            <ThemedText type="small" style={styles.green}>
              Completed
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.reportButton}>
            <ThemedText type="small" style={styles.white}>
              ⚠ Report Issue with this Trip
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText type="smallBold" style={styles.white}>
          Categories
        </ThemedText>
        <View style={styles.grid}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c.label}
              style={[styles.categoryCard, c.highlight && styles.categoryCardHighlight]}>
              <ThemedText style={styles.categoryIcon}>{c.icon}</ThemedText>
              <ThemedText type="smallBold" style={{ color: c.highlight ? RED : '#ffffff' }}>
                {c.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedText type="smallBold" style={styles.white}>
          Popular Articles
        </ThemedText>
        {ARTICLES.map((article) => (
          <TouchableOpacity key={article} style={styles.articleRow}>
            <ThemedText style={styles.articleText}>{article}</ThemedText>
            <ThemedText themeColor="textSecondary">›</ThemedText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.chatButton}>
          <ThemedText style={styles.white}>💬 Start Live Chat</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  green: { color: GREEN },
  searchBox: { backgroundColor: '#141517', borderRadius: 10, padding: Spacing.three },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  tripCard: {
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  tripTop: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  tripText: { flex: 1 },
  reportButton: {
    backgroundColor: '#2E3135',
    borderRadius: 10,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  categoryCard: {
    width: '47%',
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
  },
  categoryCardHighlight: { borderWidth: 1, borderColor: RED },
  categoryIcon: { fontSize: 20 },
  articleRow: {
    flexDirection: 'row',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
    alignItems: 'center',
  },
  articleText: { color: '#ffffff', flex: 1 },
  chatButton: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
});