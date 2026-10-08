import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';
const WAIT_SECONDS = 2 * 60 + 15;

export default function ArrivedWaitingScreen({ navigation }: RootScreenProps<'ArrivedWaiting'>) {
  const [seconds, setSeconds] = useState(WAIT_SECONDS);
  const [helmetChecked, setHelmetChecked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.topRow}>
        <View style={styles.iconButton}>
          <ThemedText style={styles.white}>☰</ThemedText>
        </View>
        <TouchableOpacity style={styles.sosBadge} onPress={() => navigation.navigate('SosActive')}>
          <ThemedText style={styles.sosText}>✱ SOS</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.map}>
        <View style={styles.pickupPill}>
          <ThemedText style={styles.white}>📍 Pickup</ThemedText>
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.topInfoRow}>
          <ThemedText type="subtitle" style={styles.white}>
            Arrived
          </ThemedText>
          <View style={styles.alignEnd}>
            <ThemedText type="small" themeColor="textSecondary">
              Est. Fare
            </ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              ₹{trip.fare}
            </ThemedText>
          </View>
        </View>
        <ThemedText type="small" style={{ color: AMBER }}>
          🕐 Waiting for {mm}:{ss}
        </ThemedText>

        <View style={styles.riderRow}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar} />
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.flex}>
            <ThemedText type="smallBold" style={styles.white}>
              {trip.rider}
            </ThemedText>
            <ThemedText type="small" style={{ color: AMBER }}>
              ⭐ {trip.rating}
            </ThemedText>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <ThemedText style={styles.chatIcon}>💬</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.checklistBox}>
          <ThemedText type="smallBold" style={styles.white}>
            PRE-TRIP CHECKLIST
          </ThemedText>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setHelmetChecked((v) => !v)}>
            <View style={[styles.checkbox, helmetChecked && styles.checkboxChecked]} />
            <ThemedText style={styles.white}>Passenger wearing helmet</ThemedText>
          </TouchableOpacity>
          <View style={styles.infoBox}>
            <ThemedText type="small" themeColor="textSecondary">
              ⓘ Bike service requires verifying rider safety gear before starting trip.
            </ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.startButton, helmetChecked && styles.startButtonActive]}
          disabled={!helmetChecked}
          onPress={() => navigation.navigate('SafetyCheck')}>
          <ThemedText style={{ color: helmetChecked ? '#0B0B0C' : '#60646C', fontWeight: '700' }}>
            Start Trip →
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  flex: { flex: 1 },
  alignEnd: { alignItems: 'flex-end' },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  sosText: { color: '#ffffff', fontWeight: '700' },
  map: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pickupPill: {
    backgroundColor: '#141517',
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  sheet: {
    backgroundColor: '#141517',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2E3135',
    alignSelf: 'center',
  },
  topInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  riderRow: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
  avatarWrap: { position: 'relative' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2E3135' },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ACCENT,
    borderWidth: 2,
    borderColor: '#141517',
  },
  chatIcon: { fontSize: 20 },
  checklistBox: { gap: Spacing.two },
  checkboxRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#2E3135' },
  checkboxChecked: { backgroundColor: ACCENT, borderColor: ACCENT },
  infoBox: { backgroundColor: '#0B0B0C', borderRadius: 10, padding: Spacing.two },
  startButton: {
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  startButtonActive: { backgroundColor: ACCENT },
});