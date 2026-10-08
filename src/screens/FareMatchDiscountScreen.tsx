import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function FareMatchDiscountScreen({
  navigation,
}: RootScreenProps<'FareMatchDiscount'>) {
  const [uploaded, setUploaded] = useState(false);
  const [matched, setMatched] = useState('215');

  const matchedFare = Number(matched) || 0;
  const coverage = Math.max(0, trip.fare - matchedFare);
  const canConfirm = uploaded && matchedFare > 0 && matchedFare < trip.fare;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ThemedText style={styles.close}>✕</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.white}>
            Fare Match
          </ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.percent}>%</ThemedText>
          <ThemedText type="smallBold" style={styles.white}>
            Match a lower fare
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Apply a discount to match a competitor's price for this rider. The difference is fully
            funded by the platform; your earnings are not affected.
          </ThemedText>
        </View>

        <ThemedText type="smallBold" themeColor="textSecondary">
          COMPETITOR EVIDENCE
        </ThemedText>
        {uploaded ? (
          <View style={styles.fileRow}>
            <ThemedText>🖼️</ThemedText>
            <ThemedText style={styles.fileName}>competitor_fare.png</ThemedText>
            <TouchableOpacity onPress={() => setUploaded(false)}>
              <ThemedText>🗑️</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadBox} onPress={() => setUploaded(true)}>
            <ThemedText style={styles.uploadIcon}>🖼️</ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              Upload screenshot
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Required to approve match
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              or
            </ThemedText>
            <View style={styles.takePhotoButton}>
              <ThemedText style={styles.white}>📷 Take photo</ThemedText>
            </View>
          </TouchableOpacity>
        )}

        <ThemedText type="smallBold" themeColor="textSecondary">
          FARE CALCULATION
        </ThemedText>
        <View style={styles.calcCard}>
          <View style={styles.calcRow}>
            <ThemedText style={styles.white}>Original Fare</ThemedText>
            <ThemedText style={styles.white}>₹{trip.fare.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.calcRow}>
            <ThemedText style={styles.white}>Matched Fare</ThemedText>
            <View style={styles.matchedInputWrap}>
              <ThemedText style={styles.white}>₹</ThemedText>
              <TextInput
                style={styles.matchedInput}
                value={matched}
                onChangeText={(text) => setMatched(text.replace(/[^0-9.]/g, ''))}
                keyboardType="decimal-pad"
                maxLength={7}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.calcRow}>
            <ThemedText style={styles.accent}>Platform Coverage</ThemedText>
            <ThemedText style={styles.accent}>+₹{coverage.toFixed(2)}</ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Your gross earnings remain ₹{trip.fare.toFixed(2)}. Platform funds the ₹
            {coverage.toFixed(2)} discount.
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, canConfirm && styles.confirmButtonActive]}
          disabled={!canConfirm}
          onPress={() => navigation.goBack()}>
          <ThemedText style={{ color: canConfirm ? '#0B0B0C' : '#60646C', fontWeight: '700' }}>
            ✓ Credit & Continue
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.two, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  close: { color: '#ffffff', fontSize: 18 },
  headerSpacer: { width: 18 },
  infoCard: { backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three, gap: 4 },
  percent: { fontSize: 18, color: ACCENT },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
    padding: Spacing.four,
  },
  uploadIcon: { fontSize: 24 },
  takePhotoButton: {
    backgroundColor: '#2E3135',
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    marginTop: Spacing.one,
  },
  fileRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
  },
  fileName: { color: '#ffffff', flex: 1 },
  calcCard: {
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  calcRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  matchedInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
  },
  matchedInput: { color: '#ffffff', minWidth: 60, textAlign: 'right', paddingVertical: 4 },
  divider: { height: 1, backgroundColor: '#2E3135' },
  confirmButton: {
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  confirmButtonActive: { backgroundColor: ACCENT },
});