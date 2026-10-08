import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Field } from '@/components/auth/field';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const RED = '#ef4444';
const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const BANKS: Record<string, string> = {
  HDFC: 'HDFC Bank',
  SBIN: 'State Bank of India',
  ICIC: 'ICICI Bank',
  UTIB: 'Axis Bank',
  PUNB: 'Punjab National Bank',
  KKBK: 'Kotak Mahindra Bank',
};

export default function AddBankAccountScreen({ navigation }: RootScreenProps<'AddBankAccount'>) {
  const [form, setForm] = useState({
    name: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifsc: '',
  });
  const [bank, setBank] = useState<string | null>(null);
  const [ifscError, setIfscError] = useState('');

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const numbersMatch = form.accountNumber === form.confirmAccountNumber;
  const showMismatch = form.confirmAccountNumber.length > 0 && !numbersMatch;
  const canSave =
    form.name.trim().length > 0 &&
    form.accountNumber.length >= 9 &&
    numbersMatch &&
    bank !== null;

  function changeIfsc(text: string) {
    update('ifsc')(text.toUpperCase());
    setBank(null);
    setIfscError('');
  }

  function verifyIfsc() {
    if (!IFSC_PATTERN.test(form.ifsc)) {
      setIfscError('IFSC must be 11 characters, e.g. HDFC0001234');
      return;
    }
    const code = form.ifsc.slice(0, 4);
    setBank(BANKS[code] ?? `Bank code ${code}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ScreenHeader title="Bank Details" showBell={false} />

        <ThemedText type="subtitle" style={styles.white}>
          Payout Destination
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          Enter your bank account details securely to receive your earnings.
        </ThemedText>

        <Field
          label="Account Holder Name"
          placeholder="As it appears on your bank statement"
          value={form.name}
          onChangeText={update('name')}
        />
        <Field
          label="Account Number"
          placeholder="Enter account number"
          keyboardType="number-pad"
          maxLength={18}
          value={form.accountNumber}
          onChangeText={update('accountNumber')}
        />
        <Field
          label="Confirm Account Number"
          placeholder="Re-enter account number"
          keyboardType="number-pad"
          maxLength={18}
          value={form.confirmAccountNumber}
          onChangeText={update('confirmAccountNumber')}
        />
        {showMismatch && (
          <ThemedText type="small" style={styles.error}>
            Account numbers don't match.
          </ThemedText>
        )}

        <View style={styles.ifscRow}>
          <View style={styles.ifscField}>
            <Field
              label="IFSC Code"
              placeholder="e.g. HDFC0001234"
              autoCapitalize="characters"
              maxLength={11}
              value={form.ifsc}
              onChangeText={changeIfsc}
            />
          </View>
          <TouchableOpacity style={styles.verifyButton} onPress={verifyIfsc}>
            <ThemedText style={styles.accent}>Verify</ThemedText>
          </TouchableOpacity>
        </View>
        {ifscError !== '' && (
          <ThemedText type="small" style={styles.error}>
            {ifscError}
          </ThemedText>
        )}
        {bank && (
          <View style={styles.verifiedBox}>
            <ThemedText style={styles.accent}>✓</ThemedText>
            <View>
              <ThemedText type="smallBold" style={styles.white}>
                {bank}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                IFSC {form.ifsc}
              </ThemedText>
            </View>
          </View>
        )}

        <View style={styles.lockBox}>
          <ThemedText type="small" themeColor="textSecondary">
            🔒 Your bank details are encrypted and stored securely.
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          disabled={!canSave}
          onPress={() => navigation.goBack()}>
          <ThemedText style={styles.saveText}>Save Bank Details</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  error: { color: RED },
  ifscRow: { flexDirection: 'row', gap: Spacing.three, alignItems: 'flex-end' },
  ifscField: { flex: 1 },
  verifyButton: { paddingVertical: Spacing.two, paddingHorizontal: Spacing.one },
  verifiedBox: {
    flexDirection: 'row',
    gap: Spacing.two,
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
  },
  lockBox: { backgroundColor: '#141517', borderRadius: 10, padding: Spacing.three },
  saveButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  saveButtonDisabled: { opacity: 0.4 },
  saveText: { color: '#0B0B0C', fontWeight: '700' },
});