import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function CallingScreen({ navigation }: RootScreenProps<'Calling'>) {
  const [seconds, setSeconds] = useState(45);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <ThemedText type="smallBold" style={styles.callingLabel}>
          CALLING RIDER...
        </ThemedText>
        <ThemedText style={styles.timer}>
          {mm}:{ss}
        </ThemedText>
      </View>

      <View style={styles.avatarCircle} />
      <ThemedText type="subtitle" style={styles.name}>
        {trip.rider.split(' ')[0]}
      </ThemedText>
      <View style={styles.routeChip}>
        <ThemedText type="small" style={styles.accent}>
          {trip.pickupArea}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {' → '}
        </ThemedText>
        <ThemedText type="small" style={styles.accent}>
          {trip.dropArea}
        </ThemedText>
      </View>

      <View style={styles.spacer} />

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlButton} onPress={() => setSpeaker((v) => !v)}>
          <ThemedText style={styles.controlIcon}>{speaker ? '🔊' : '🔈'}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endCallButton} onPress={() => navigation.goBack()}>
          <ThemedText style={styles.endIcon}>📵</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => setMuted((v) => !v)}>
          <ThemedText style={styles.controlIcon}>{muted ? '🔇' : '🎤'}</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C', padding: Spacing.four, gap: Spacing.three },
  accent: { color: ACCENT },
  top: { alignItems: 'center', gap: 4, marginTop: Spacing.four },
  callingLabel: { color: ACCENT, letterSpacing: 1 },
  timer: { color: '#ffffff', fontSize: 18 },
  avatarCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: ACCENT,
    backgroundColor: '#141517',
    alignSelf: 'center',
  },
  name: { color: '#ffffff', textAlign: 'center' },
  routeChip: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#141517',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  spacer: { flex: 1 },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIcon: { fontSize: 20 },
  endCallButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endIcon: { fontSize: 24 },
});