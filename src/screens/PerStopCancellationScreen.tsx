import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const AMBER = '#F59E0B';
const RED = '#ef4444';

const REASONS = [
  'Rider No-Show',
  'Unsafe Pickup Location',
  "Too Much Luggage / Won't Fit",
  'Rider Requested Cancel',
];

export default function PerStopCancellationScreen({
  navigation,
  route,
}: RootScreenProps<'PerStopCancellation'>) {
  const stopName = route.params?.stopName ?? 'Neha';
  const stopInfo = route.params?.stopInfo ?? 'Stop 2 of 3 • Ballupur Chowk';
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ThemedText style={styles.close}>✕</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.white}>
            Cancel Stop
          </ThemedText>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.warnCard}>
          <ThemedText type="smallBold" style={styles.white}>
            👤 Remove {stopName}'s Stop
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {stopInfo}
          </ThemedText>
          <View style={styles.warnBox}>
            <ThemedText type="small" style={{ color: AMBER }}>
              ⓘ Canceling this stop will recalculate the route for remaining passengers. Your
              estimated earnings will be adjusted.
            </ThemedText>
          </View>
        </View>

        <ThemedText type="smallBold" themeColor="textSecondary">
          SELECT REASON
        </ThemedText>
        {REASONS.map((r) => (
          <TouchableOpacity key={r} style={styles.reasonRow} onPress={() => setSelected(r)}>
            <ThemedText style={styles.reasonText}>{r}</ThemedText>
            <View style={[styles.radio, selected === r && styles.radioSelected]} />
          </TouchableOpacity>
        ))}

        <TextInput
          style={styles.input}
          placeholder="Add optional details..."
          placeholderTextColor="#60646C"
          value={details}
          onChangeText={setDetails}
          multiline
        />

        <TouchableOpacity
          style={[styles.confirmButton, !selected && styles.confirmButtonDisabled]}
          disabled={!selected}
          onPress={() => navigation.goBack()}>
          <ThemedText style={styles.confirmText}>⊘ Confirm Removal</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.two, flexGrow: 1 },
  white: { color: '#ffffff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  close: { color: '#ffffff', fontSize: 18 },
  headerSpacer: { width: 18 },
  warnCard: {
    backgroundColor: '#141517',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: AMBER,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  warnBox: { backgroundColor: '#2a1213', borderRadius: 10, padding: Spacing.two },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
  },
  reasonText: { color: '#ffffff', flex: 1 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: '#60646C' },
  radioSelected: { borderColor: RED, backgroundColor: RED },
  input: {
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
    color: '#ffffff',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  confirmButton: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.three,
  },
  confirmButtonDisabled: { opacity: 0.5 },
  confirmText: { color: '#ffffff', fontWeight: '700' },
});