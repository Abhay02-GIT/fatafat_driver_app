import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const REJECTED = [
  {
    label: 'Driving Licence',
    reason: 'The photo provided is too blurry to read the expiration date clearly.',
    tip: 'Ensure good lighting and lay the card flat.',
  },
  {
    label: 'Vehicle Insurance',
    reason: 'The document appears to be expired. The coverage dates must be current.',
    tip: 'Upload your most recent, active policy document.',
  },
];

export default function VerificationRejectedScreen({
  navigation,
}: RootScreenProps<'VerificationRejected'>) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.six },
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ThemedText style={styles.backArrow}>←</ThemedText>
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <ThemedText style={styles.iconMark}>!</ThemedText>
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        Verification Rejected
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        We couldn't verify some of your documents. Please review the issues below and try again.
      </ThemedText>

      {REJECTED.map((r) => (
        <View key={r.label} style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText type="smallBold" style={styles.white}>
              {r.label}
            </ThemedText>
            <View style={styles.rejectedBadge}>
              <ThemedText type="small" style={styles.white}>
                REJECTED
              </ThemedText>
            </View>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {r.reason}
          </ThemedText>
          <View style={styles.tipRow}>
            <ThemedText>💡</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.tipText}>
              {r.tip}
            </ThemedText>
          </View>
        </View>
      ))}

      <View style={styles.clearedRow}>
        <ThemedText type="small" themeColor="textSecondary">
          Police Verification
        </ThemedText>
        <ThemedText type="small" style={styles.cleared}>
          ✓ Verified Successfully
        </ThemedText>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('RegisterDocuments')}>
        <ThemedText style={styles.primaryText}>📝 Fix & Re-submit</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton}>
        <ThemedText style={styles.white}>🎧 Contact Support</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  backArrow: { color: '#ffffff', fontSize: 20 },
  white: { color: '#ffffff' },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ef4444',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMark: { fontSize: 32, color: '#ffffff' },
  title: { color: '#ffffff', textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  card: {
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
    backgroundColor: '#1a1213',
    borderRadius: 10,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  rejectedBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#141517',
    borderRadius: 8,
    padding: Spacing.two,
  },
  tipText: { flex: 1 },
  clearedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
    opacity: 0.6,
  },
  cleared: { color: '#22C55E' },
  primaryButton: {
    backgroundColor: '#2E3135',
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  primaryText: { color: '#ffffff', fontWeight: '700' },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
});