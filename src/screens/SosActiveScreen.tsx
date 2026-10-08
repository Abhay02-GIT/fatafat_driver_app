import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const CANCEL_WINDOW = 10;

export default function SosActiveScreen({ navigation }: RootScreenProps<'SosActive'>) {
  const [secondsLeft, setSecondsLeft] = useState(CANCEL_WINDOW);
  const sent = secondsLeft <= 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconCircle}>
        <ThemedText style={styles.icon}>✱</ThemedText>
      </View>
      <ThemedText type="title" style={styles.title}>
        {sent ? 'Emergency Alert Sent' : 'Connecting to Safety Desk...'}
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Your live location and trip details are being securely transmitted to emergency services.
      </ThemedText>
      <View style={styles.pulseCircle} />
      <ThemedText style={styles.hint}>
        {sent
          ? 'Help is on the way. Stay where you are if it is safe to do so.'
          : `If this was a mistake, you can cancel within ${secondsLeft} seconds.`}
      </ThemedText>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <ThemedText style={styles.cancelText}>{sent ? 'Close' : '✕ Cancel SOS'}</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 32, color: '#ef4444' },
  title: { color: '#ffffff', textAlign: 'center' },
  subtitle: { color: '#fde2e2', textAlign: 'center' },
  pulseCircle: {
    width: 160,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  hint: { color: '#fde2e2', textAlign: 'center' },
  cancelButton: {
    backgroundColor: '#0B0B0C',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.six,
  },
  cancelText: { color: '#ffffff', fontWeight: '700' },
});