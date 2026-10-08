import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function SafetyCheckScreen({ navigation }: RootScreenProps<'SafetyCheck'>) {
  const [handedOver, setHandedOver] = useState(false);
  const [secured, setSecured] = useState(false);
  const canConfirm = handedOver && secured;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ThemedText style={styles.close}>✕</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.white}>
          Safety Check
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.iconCircle}>
        <ThemedText style={styles.bikeIcon}>🏍️</ThemedText>
        <View style={styles.iconBadge}>
          <ThemedText style={styles.badgeTick}>✓</ThemedText>
        </View>
      </View>

      <ThemedText type="subtitle" style={styles.title}>
        Pre-Ride Safety
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        Ensure passenger safety before commencing the trip. Both items must be verified.
      </ThemedText>

      <TouchableOpacity style={styles.checkCard} onPress={() => setHandedOver((v) => !v)}>
        <View style={styles.checkText}>
          <ThemedText type="smallBold" style={styles.white}>
            Helmet handed over
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Passenger has received the safety helmet.
          </ThemedText>
        </View>
        <View style={[styles.checkbox, handedOver && styles.checkboxChecked]} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkCard} onPress={() => setSecured((v) => !v)}>
        <View style={styles.checkText}>
          <ThemedText type="smallBold" style={styles.white}>
            Helmet secured
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Strap is fastened properly on passenger.
          </ThemedText>
        </View>
        <View style={[styles.checkbox, secured && styles.checkboxChecked]} />
      </TouchableOpacity>

      <View style={styles.tipBox}>
        <ThemedText type="smallBold" style={styles.tipTitle}>
          ⓘ Two-Wheeler Safety
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Maintain safe speeds, especially in traffic. Avoid sudden braking or sharp turns. Ensure
          passenger sits straight and holds securely.
        </ThemedText>
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity
        style={[styles.confirmButton, canConfirm && styles.confirmButtonActive]}
        disabled={!canConfirm}
        onPress={() => navigation.replace('ActiveNavigation')}>
        <ThemedText style={{ color: canConfirm ? '#0B0B0C' : '#60646C', fontWeight: '700' }}>
          🏍️ Confirm & Start Trip
        </ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  white: { color: '#ffffff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.two,
  },
  close: { color: '#ffffff', fontSize: 18 },
  headerSpacer: { width: 18 },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#141517',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  bikeIcon: { fontSize: 36 },
  iconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTick: { color: '#ffffff', fontSize: 12 },
  title: { color: '#ffffff', textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  checkCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  checkText: { flex: 1 },
  checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 1, borderColor: '#2E3135' },
  checkboxChecked: { backgroundColor: ACCENT, borderColor: ACCENT },
  tipBox: { backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three, gap: 4 },
  tipTitle: { color: '#F59E0B' },
  spacer: { flex: 1 },
  confirmButton: {
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  confirmButtonActive: { backgroundColor: ACCENT },
});