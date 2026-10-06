import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { OtpInput } from '@/components/auth/otp-input';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const RESEND_SECONDS = 29;

export default function VerifyOtpScreen({ navigation, route }: RootScreenProps<'VerifyOtp'>) {
  const { phone } = route.params;
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const canVerify = code.length === 6;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthHeader
          title="Verify Phone"
          subtitle={`Enter the 6-digit code sent to\n+91 ${phone.slice(0, 5)}*****`}
        />

        <OtpInput onChange={setCode} />

        <ThemedText type="small" themeColor="textSecondary" style={styles.resendRow}>
          Didn't receive the code?{' '}
          <ThemedText
            type="smallBold"
            style={styles.resendText}
            onPress={secondsLeft === 0 ? () => setSecondsLeft(RESEND_SECONDS) : undefined}>
            {secondsLeft > 0 ? `00:${String(secondsLeft).padStart(2, '0')}` : 'Resend'}
          </ThemedText>
        </ThemedText>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity
          style={[styles.verifyButton, !canVerify && styles.verifyButtonDisabled]}
          disabled={!canVerify}
          onPress={() => navigation.navigate('BecomeRider')}>
          <ThemedText style={styles.verifyText}>Verify & Continue</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C', justifyContent: 'space-between' },
  content: { paddingHorizontal: Spacing.four, paddingTop: Spacing.six, gap: Spacing.four },
  resendRow: { marginTop: Spacing.two },
  resendText: { color: '#ffffff' },
  footer: { paddingHorizontal: Spacing.four, paddingTop: Spacing.four },
  verifyButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  verifyButtonDisabled: { opacity: 0.5 },
  verifyText: { color: '#0B0B0C', fontWeight: '700', fontSize: 16 },
});