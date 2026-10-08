import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const RED = '#ef4444';

export default function IdentityCheckScreen({ navigation }: RootScreenProps<'IdentityCheck'>) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ThemedText style={styles.back}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.white}>
          Identity Check
        </ThemedText>
        <ThemedText style={styles.shield}>🛡️</ThemedText>
      </View>

      <ThemedText type="subtitle" style={styles.white}>
        Pink Scooty Verification
      </ThemedText>
      <ThemedText themeColor="textSecondary">
        Confirm if the rider matches the photo below to ensure platform safety.
      </ThemedText>

      <View style={styles.photoBox} />

      <View style={styles.nameRow}>
        <ThemedText type="subtitle" style={styles.white}>
          Priya Sharma
        </ThemedText>
        <View style={styles.verifiedPill}>
          <ThemedText type="small" style={styles.accent}>
            ✓ Verified Profile
          </ThemedText>
        </View>
      </View>

      <View style={styles.infoBox}>
        <ThemedText type="small" themeColor="textSecondary">
          ⓘ Refusing a ride due to a mismatch is required by policy and will not affect your
          acceptance rate.
        </ThemedText>
      </View>

      <TouchableOpacity
        style={styles.matchButton}
        onPress={() => navigation.replace('ActiveNavigation')}>
        <ThemedText style={styles.matchText}>✓ Identity Matches - Start Trip</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mismatchButton} onPress={() => navigation.goBack()}>
        <ThemedText style={styles.mismatchText}>⚠ Identity Mismatch</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C', padding: Spacing.four, gap: Spacing.three },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#ffffff', fontSize: 20 },
  shield: { fontSize: 18 },
  photoBox: { flex: 1, minHeight: 220, backgroundColor: '#141517', borderRadius: 14 },
  nameRow: { alignItems: 'center', gap: Spacing.two },
  verifiedPill: {
    backgroundColor: '#0f2a17',
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
  },
  infoBox: { backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three },
  matchButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  matchText: { color: '#0B0B0C', fontWeight: '700' },
  mismatchButton: {
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  mismatchText: { color: RED, fontWeight: '700' },
});