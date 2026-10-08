import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const PINK = '#ec4899';
const ACCENT = '#22C55E';

export default function PinkScootySafetyBadgeScreen({
  navigation,
}: RootScreenProps<'PinkScootySafetyBadge'>) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ThemedText style={styles.back}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.white}>
            Safety Profile
          </ThemedText>
          <View style={styles.progressPill} />
        </View>

        <View style={styles.badgeCard}>
          <ThemedText style={styles.badgeIcon}>🏅</ThemedText>
          <ThemedText type="subtitle" style={styles.white}>
            Trusted Pink Scooty Driver
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.center}>
            Highest level of women safety assurance certified
          </ThemedText>
          <View style={styles.statsRow}>
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                TOTAL SAFE RIDES
              </ThemedText>
              <ThemedText type="subtitle" style={styles.white}>
                1,240
              </ThemedText>
            </View>
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                ACCIDENT-FREE
              </ThemedText>
              <ThemedText type="subtitle" style={{ color: ACCENT }}>
                100%
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.scoreCard}>
          <ThemedText type="smallBold" style={styles.white}>
            Safety Scorecard
          </ThemedText>
          <View style={styles.scoreRow}>
            <View style={[styles.scoreDot, { backgroundColor: PINK }]} />
            <View style={styles.flex}>
              <ThemedText style={styles.white}>Women Rider Feedback</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Based on last 500 ratings
              </ThemedText>
            </View>
            <ThemedText style={styles.white}>⭐ 4.98</ThemedText>
          </View>
          <View style={styles.scoreRow}>
            <View style={[styles.scoreDot, { backgroundColor: ACCENT }]} />
            <View style={styles.flex}>
              <ThemedText style={styles.white}>Protocol Adherence</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Selfie & helmet compliance
              </ThemedText>
            </View>
            <ThemedText style={{ color: ACCENT }}>100%</ThemedText>
          </View>
        </View>

        <View style={styles.commentCard}>
          <ThemedText type="smallBold" style={{ color: PINK }}>
            RECENT RIDER COMMENT
          </ThemedText>
          <ThemedText style={styles.white}>
            "Amazing experience. The driver did the selfie check instantly and offered me the
            safety helmet. Feel so safe riding Pink Scooty!"
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            — Anjali M. (Yesterday)
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] })}>
          <ThemedText style={styles.backButtonText}>Go Back to Dashboard</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  flex: { flex: 1 },
  center: { textAlign: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#ffffff', fontSize: 20 },
  progressPill: { width: 100, height: 8, borderRadius: 4, backgroundColor: PINK },
  badgeCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    alignItems: 'center',
    gap: 4,
  },
  badgeIcon: { fontSize: 32 },
  statsRow: { flexDirection: 'row', gap: Spacing.six, marginTop: Spacing.two },
  scoreCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  scoreRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  scoreDot: { width: 24, height: 24, borderRadius: 6 },
  commentCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  backButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  backButtonText: { color: '#0B0B0C', fontWeight: '700' },
});