import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const PINK = '#ec4899';
const GREEN = '#22C55E';

export default function FemaleRiderVerificationScreen({
  navigation,
}: RootScreenProps<'FemaleRiderVerification'>) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ThemedText style={styles.back}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.white}>
            Identity Match
          </ThemedText>
          <View style={styles.progressPill} />
        </View>

        <ThemedText type="smallBold" style={{ color: PINK }}>
          SAFETY SELFIE CHECK
        </ThemedText>
        <ThemedText type="subtitle" style={styles.white}>
          Confirm Female Rider Match
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          Ensure the rider matches their profile photo below for a guaranteed secure trip.
        </ThemedText>

        <View style={styles.photosRow}>
          <View style={styles.photoBox}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.photoLabel}>
              Registered Profile
            </ThemedText>
          </View>
          <View style={[styles.photoBox, styles.photoBoxLive]}>
            <ThemedText type="small" style={[styles.photoLabel, { color: GREEN }]}>
              Live Selfie Scan
            </ThemedText>
          </View>
        </View>

        <View style={styles.matchBanner}>
          <ThemedText style={{ color: GREEN }}>
            🔄 Identity verified successfully by our biometric secure matching algorithm.
          </ThemedText>
        </View>

        <View style={styles.tipsCard}>
          <ThemedText type="smallBold" style={styles.white}>
            Safe-Ride Best Practices
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            🪖 Provide the pink safety helmet to the rider before starting.
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            🛡️ Ensure the trip sharing PIN matches on both phones.
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.replace('ActiveNavigation')}>
          <ThemedText style={styles.startText}>🔗 Start Secure Trip</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.two, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#ffffff', fontSize: 20 },
  progressPill: { width: 100, height: 8, borderRadius: 4, backgroundColor: PINK },
  photosRow: { flexDirection: 'row', gap: Spacing.two },
  photoBox: {
    flex: 1,
    height: 160,
    borderRadius: 10,
    backgroundColor: '#141517',
    justifyContent: 'flex-end',
    padding: Spacing.two,
  },
  photoBoxLive: { backgroundColor: '#0f2a1c' },
  photoLabel: { textAlign: 'center' },
  matchBanner: { backgroundColor: '#0f2a1c', borderRadius: 12, padding: Spacing.three },
  tipsCard: {
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  startButton: {
    backgroundColor: GREEN,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  startText: { color: '#0B0B0C', fontWeight: '700' },
});