import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_PARCEL as parcel } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';
const OTP_LENGTH = 4;
const COD_AMOUNT = 450;

export default function DropVerificationCodScreen({
  navigation,
}: RootScreenProps<'DropVerificationCod'>) {
  const [otp, setOtp] = useState('');
  const [signed, setSigned] = useState(false);
  const [cashReceived, setCashReceived] = useState(false);
  const verified = otp.length === OTP_LENGTH || signed;
  const canComplete = verified && cashReceived;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ThemedText style={styles.back}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.white}>
            Drop Verification
          </ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.orderCard}>
          <View style={styles.orderTop}>
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                ORDER ID
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                {parcel.orderId}
              </ThemedText>
            </View>
            <View style={styles.parcelPill}>
              <ThemedText type="small" style={styles.white}>
                📦 Parcel
              </ThemedText>
            </View>
          </View>
          <View style={styles.recipientRow}>
            <View style={styles.avatar} />
            <View>
              <ThemedText type="smallBold" style={styles.white}>
                {parcel.receiver}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                +91 91234 56780
              </ThemedText>
            </View>
          </View>
          <View style={styles.dropoffBox}>
            <ThemedText>📍</ThemedText>
            <View style={styles.flex}>
              <ThemedText type="small" themeColor="textSecondary">
                DROP-OFF
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                {parcel.dropAddress}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Leave with security if no answer.
              </ThemedText>
            </View>
          </View>
        </View>

        <ThemedText type="subtitle" style={styles.white}>
          Verification Required
        </ThemedText>
        <View style={styles.otpCard}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            ENTER RECIPIENT OTP
          </ThemedText>
          <View style={styles.otpWrap}>
            <View style={styles.otpRow}>
              {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                <View key={i} style={[styles.otpBox, i === otp.length && styles.otpBoxActive]}>
                  <ThemedText style={styles.white}>{otp[i] ?? '•'}</ThemedText>
                </View>
              ))}
            </View>
            <TextInput
              style={styles.hiddenInput}
              value={otp}
              onChangeText={(text) => setOtp(text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={OTP_LENGTH}
              caretHidden
            />
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
            OR
          </ThemedText>
          <TouchableOpacity style={styles.signatureButton} onPress={() => setSigned((v) => !v)}>
            <ThemedText style={styles.white}>
              {signed ? '✓ Signature captured' : '✍️ Capture Signature'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.codCard}>
          <ThemedText type="smallBold" style={{ color: AMBER }}>
            💵 Cash on Delivery
          </ThemedText>
          <View style={styles.codRow}>
            <ThemedText style={styles.white}>Amount to Collect</ThemedText>
            <ThemedText type="subtitle" style={styles.white}>
              ₹{COD_AMOUNT.toFixed(2)}
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setCashReceived((v) => !v)}>
            <View style={[styles.checkbox, cashReceived && styles.checkboxChecked]} />
            <ThemedText style={styles.white}>
              I have received ₹{COD_AMOUNT.toFixed(2)} in cash
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.feeRow}>
          <ThemedText type="small" themeColor="textSecondary">
            YOUR EARNING — Delivery Fee
          </ThemedText>
          <ThemedText type="smallBold" style={styles.accent}>
            ₹{parcel.fee.toFixed(2)}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[styles.completeButton, canComplete && styles.completeButtonActive]}
          disabled={!canComplete}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] })}>
          <ThemedText style={{ color: canComplete ? '#0B0B0C' : '#60646C', fontWeight: '700' }}>
            ✓ Complete Delivery
          </ThemedText>
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
  flex: { flex: 1 },
  center: { textAlign: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#ffffff', fontSize: 20 },
  headerSpacer: { width: 20 },
  orderCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between' },
  parcelPill: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  recipientRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2E3135' },
  dropoffBox: {
    flexDirection: 'row',
    gap: Spacing.two,
    backgroundColor: '#0B0B0C',
    borderRadius: 10,
    padding: Spacing.three,
  },
  otpCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
  },
  otpWrap: { position: 'relative' },
  otpRow: { flexDirection: 'row', gap: Spacing.two },
  otpBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E3135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: { borderColor: ACCENT },
  hiddenInput: { ...StyleSheet.absoluteFill, opacity: 0 },
  signatureButton: {
    backgroundColor: '#2E3135',
    borderRadius: 10,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  codCard: {
    borderWidth: 1,
    borderColor: AMBER,
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  codRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  checkboxRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#2E3135' },
  checkboxChecked: { backgroundColor: ACCENT, borderColor: ACCENT },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  completeButton: {
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  completeButtonActive: { backgroundColor: ACCENT },
});