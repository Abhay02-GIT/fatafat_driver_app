import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

const FEATURES = [
  {
    icon: '💰',
    title: 'Top Earnings',
    desc: 'Maximize your income with competitive rates and bonuses.',
  },
  {
    icon: '🕐',
    title: 'Flexible Hours',
    desc: 'Drive when you want. You are in complete control of your time.',
  },
  {
    icon: '🛡️',
    title: 'Safety Cover',
    desc: '24/7 support and comprehensive insurance on every trip.',
  },
];

export default function BecomeRiderScreen({ navigation }: RootScreenProps<'BecomeRider'>) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.four, paddingBottom: insets.bottom + Spacing.six },
      ]}>
      <ThemedText type="subtitle" style={styles.title}>
        Become a Rider
      </ThemedText>
      <ThemedText themeColor="textSecondary">
        Join the fleet and start earning on your own schedule.
      </ThemedText>

      <View style={styles.heroBanner}>
        <ThemedText style={styles.heroText}>BECOME A RIDER</ThemedText>
      </View>

      {FEATURES.map((f) => (
        <View key={f.title} style={styles.card}>
          <ThemedText style={styles.cardIcon}>{f.icon}</ThemedText>
          <View style={styles.cardTextWrap}>
            <ThemedText type="smallBold" style={styles.cardTitle}>
              {f.title}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {f.desc}
            </ThemedText>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('RegisterStep1')}>
        <ThemedText style={styles.startText}>Start Registration →</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  title: { color: '#ffffff' },
  heroBanner: {
    backgroundColor: '#111214',
    borderRadius: 14,
    paddingVertical: Spacing.six,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.two,
  },
  heroText: { color: ACCENT, fontWeight: '800', letterSpacing: 1 },
  card: {
    flexDirection: 'row',
    gap: Spacing.three,
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
  },
  cardIcon: { fontSize: 24 },
  cardTextWrap: { flex: 1, gap: 2 },
  cardTitle: { color: '#ffffff' },
  startButton: {
    marginTop: Spacing.three,
    alignSelf: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  startText: { color: ACCENT, fontWeight: '700', textDecorationLine: 'underline' },
});