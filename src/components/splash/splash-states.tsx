import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

const ACCENT = '#22C55E';
const APP_NAME = 'Fatafat';
const APP_VERSION = 'v0.0.1 (build 1)';

function ShieldMark({ size }: { size: number }) {
  return <ThemedText style={{ fontSize: size, lineHeight: size * 1.2 }}>🛡️</ThemedText>;
}

function VersionFooter() {
  return (
    <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
      {APP_VERSION}
    </ThemedText>
  );
}

export function SplashBrand() {
  return (
    <View style={[styles.container, styles.centerAll]}>
      <ShieldMark size={72} />
      <ThemedText type="title" style={styles.brandTitle}>
        {APP_NAME}
      </ThemedText>
      <ThemedText themeColor="textSecondary">Ride. Earn. Stay protected.</ThemedText>
    </View>
  );
}

export function SplashLoading() {
  return (
    <View style={[styles.container, styles.centerAll]}>
      <View style={styles.smallIconSpacing}>
        <ShieldMark size={40} />
      </View>
      <ThemedText themeColor="textSecondary">Checking your session...</ThemedText>
    </View>
  );
}

export function SplashMaintenance() {
  return (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <View style={styles.badge}>
          <ThemedText>🔧</ThemedText>
        </View>
        <ShieldMark size={40} />
      </View>
      <View style={styles.centerAll}>
        <ThemedText type="subtitle" style={styles.centerText}>
          Under Maintenance
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          We're making things better. Please check back shortly.
        </ThemedText>
      </View>
      <VersionFooter />
    </View>
  );
}

export function SplashUpdateRequired({ onUpdate }: { onUpdate?: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.centerAll}>
        <ShieldMark size={40} />
        <ThemedText type="subtitle" style={styles.centerText}>
          Update Required
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          A new version is available with important fixes.
        </ThemedText>
        <TouchableOpacity style={styles.updateButton} onPress={onUpdate}>
          <ThemedText style={styles.updateButtonText}>Update Now</ThemedText>
        </TouchableOpacity>
      </View>
      <VersionFooter />
    </View>
  );
}

export function SplashResumingTrip({ progress = 0.4 }: { progress?: number }) {
  return (
    <View style={styles.container}>
      <View style={styles.centerAll}>
        <ShieldMark size={40} />
        <ThemedText type="smallBold" style={styles.centerText}>
          Resuming your trip...
        </ThemedText>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          You have an active booking. Reconnecting...
        </ThemedText>
      </View>
      <VersionFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
    justifyContent: 'space-between',
  },
  centerAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  centerText: { textAlign: 'center' },
  brandTitle: { color: '#ffffff' },
  smallIconSpacing: { marginBottom: Spacing.four },
  topIcons: { alignItems: 'center', gap: Spacing.three, marginTop: Spacing.four },
  badge: {
    width: 40,
    height: 40,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: ACCENT,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.one,
  },
  updateButtonText: { color: '#0B0B0C', fontWeight: '700' },
  progressTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2E3135',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: ACCENT },
  footer: { textAlign: 'center' },
});