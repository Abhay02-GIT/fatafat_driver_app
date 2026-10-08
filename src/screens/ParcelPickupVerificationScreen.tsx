import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_PARCEL as parcel } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';
const PIN_LENGTH = 4;

export default function ParcelPickupVerificationScreen({
  navigation,
}: RootScreenProps<'ParcelPickupVerification'>) {
  const [pin, setPin] = useState('');
  const canVerify = pin.length === PIN_LENGTH;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ThemedText style={styles.back}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.white}>
          Pickup Verification
        </ThemedText>
        <View style={styles.headerSpacer} />
      </SafeAreaView>

      <View style={styles.map}>
        <TouchableOpacity style={styles.crosshair}>
          <ThemedText>◎</ThemedText>
        </TouchableOpacity>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.orderCard}>
          <ThemedText style={styles.orderIcon}>🚚</ThemedText>
          <View>
            <ThemedText type="small" themeColor="textSecondary">
              PARCEL CUSTODY TRANSFER
            </ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              Order {parcel.orderId}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="smallBold" style={styles.white}>
          Sender Verification PIN
        </ThemedText>
        <View style={styles.pinWrap}>
          <View style={styles.pinRow}>
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <View key={i} style={[styles.pinBox, i === pin.length && styles.pinBoxActive]}>
                <ThemedText style={styles.pinDigit}>{pin[i] ?? '•'}</ThemedText>
              </View>
            ))}
          </View>
          <TextInput
            style={styles.hiddenInput}
            value={pin}
            onChangeText={(text) => setPin(text.replace(/\D/g, ''))}
            keyboardType="number-pad"
            maxLength={PIN_LENGTH}
            caretHidden
          />
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          Ask the sender for the 4-digit PIN.
        </ThemedText>

        <ThemedText type="smallBold" style={styles.white}>
          📷 Condition Proof
        </ThemedText>
        <TouchableOpacity style={styles.photoBox}>
          <ThemedText style={styles.photoIcon}>📷</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Capture Parcel Photo
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.warningBox}>
          <ThemedText type="smallBold" style={{ color: AMBER }}>
            ⚠ No prohibited items
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            By starting delivery, you confirm the parcel does not contain hazardous materials,
            illegal substances, or cash exceeding platform limits.
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, !canVerify && styles.verifyButtonDisabled]}
          disabled={!canVerify}
          onPress={() => navigation.replace('ParcelInTransitNavigation')}>
          <ThemedText style={styles.verifyText}>✓ Verify Pickup & Start Delivery</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  back: { color: '#ffffff', fontSize: 20 },
  headerSpacer: { width: 20 },
  map: { flex: 1 },
  crosshair: {
    position: 'absolute',
    top: Spacing.four,
    right: Spacing.four,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    backgroundColor: '#141517',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2E3135',
    alignSelf: 'center',
  },
  orderCard: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
    backgroundColor: '#0B0B0C',
    borderRadius: 12,
    padding: Spacing.three,
  },
  orderIcon: { fontSize: 20 },
  pinWrap: { position: 'relative' },
  pinRow: { flexDirection: 'row', gap: Spacing.two },
  pinBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#0B0B0C',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBoxActive: { borderColor: ACCENT },
  pinDigit: { color: '#ffffff', fontSize: 18 },
  hiddenInput: { ...StyleSheet.absoluteFill, opacity: 0 },
  photoBox: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.four,
    gap: 4,
  },
  photoIcon: { fontSize: 24 },
  warningBox: { backgroundColor: '#2a1a0f', borderRadius: 12, padding: Spacing.three, gap: 4 },
  verifyButton: { alignItems: 'center', paddingVertical: Spacing.two },
  verifyButtonDisabled: { opacity: 0.4 },
  verifyText: { color: ACCENT, fontWeight: '700' },
});