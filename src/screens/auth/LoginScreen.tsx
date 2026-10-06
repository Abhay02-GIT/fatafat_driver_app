import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthHeader } from '@/components/auth/auth-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function LoginScreen({ navigation }: RootScreenProps<'Login'>) {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const canContinue = phone.length === 10;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={styles.content}>
        <AuthHeader
          icon="🚕"
          title="Login as Rider"
          subtitle="Enter your registered mobile number to continue."
        />

        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.label}>
          MOBILE NUMBER
        </ThemedText>
        <View style={styles.phoneRow}>
          <TouchableOpacity style={styles.countryCode}>
            <ThemedText style={styles.countryText}>+91 ▾</ThemedText>
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            placeholder="00000 00000"
            placeholderTextColor="#60646C"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/\D/g, ''))}
            maxLength={10}
          />
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <View style={styles.footerLinks}>
          <ThemedText type="small" themeColor="textSecondary">
            ? Support
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.underline}>
            Terms & Privacy
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          disabled={!canContinue}
          onPress={() => navigation.navigate('VerifyOtp', { phone })}>
          <ThemedText style={styles.continueText}>Continue →</ThemedText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C', justifyContent: 'space-between' },
  content: { paddingHorizontal: Spacing.four, paddingTop: Spacing.six },
  label: { marginBottom: Spacing.two },
  phoneRow: { flexDirection: 'row', gap: Spacing.two },
  countryCode: {
    paddingHorizontal: Spacing.three,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E3135',
    backgroundColor: '#18191B',
  },
  countryText: { color: '#ffffff' },
  phoneInput: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E3135',
    backgroundColor: '#18191B',
    color: '#ffffff',
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  footer: { paddingHorizontal: Spacing.four, paddingTop: Spacing.four, gap: Spacing.three },
  footerLinks: { flexDirection: 'row', justifyContent: 'space-between' },
  underline: { textDecorationLine: 'underline' },
  continueButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  continueButtonDisabled: { opacity: 0.4 },
  continueText: { color: '#0B0B0C', fontWeight: '700', fontSize: 16 },
});