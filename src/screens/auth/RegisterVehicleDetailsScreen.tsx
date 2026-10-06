import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Field } from '@/components/auth/field';
import { PickerField } from '@/components/auth/picker-field';
import { ProgressSteps } from '@/components/auth/progress-steps';
import { ThemedText } from '@/components/themed-text';
import { COLOUR_OPTIONS, FUEL_OPTIONS, SEAT_OPTIONS } from '@/constants/options';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function RegisterVehicleDetailsScreen({
  navigation,
}: RootScreenProps<'RegisterVehicleDetails'>) {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    regNo: '',
    make: '',
    model: '',
    year: '',
    colour: '',
    fuel: '',
    seats: '4',
  });

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.six },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ThemedText style={styles.backArrow}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.white}>
          Vehicle Details
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Step 3 of 4
        </ThemedText>
      </View>

      <ProgressSteps current={3} total={4} />

      <View style={styles.rideCard}>
        <ThemedText style={styles.rideIcon}>🚗</ThemedText>
        <View style={styles.rideText}>
          <ThemedText type="smallBold" style={styles.white}>
            Standard Ride
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            4 Seats • Basic Luggage
          </ThemedText>
        </View>
        <ThemedText style={styles.check}>✓</ThemedText>
      </View>

      <Field
        label="Registration Number"
        placeholder="e.g. UK07 AB 1234"
        autoCapitalize="characters"
        value={form.regNo}
        onChangeText={update('regNo')}
      />

      <View style={styles.row2}>
        <View style={styles.half}>
          <Field
            label="Make"
            placeholder="e.g. Maruti"
            value={form.make}
            onChangeText={update('make')}
          />
        </View>
        <View style={styles.half}>
          <Field
            label="Model"
            placeholder="e.g. Swift"
            value={form.model}
            onChangeText={update('model')}
          />
        </View>
      </View>

      <View style={styles.row2}>
        <View style={styles.half}>
          <Field
            label="Year"
            placeholder="e.g. 2022"
            keyboardType="number-pad"
            maxLength={4}
            value={form.year}
            onChangeText={update('year')}
          />
        </View>
        <View style={styles.half}>
          <PickerField
            label="Colour"
            placeholder="Select Colour"
            options={COLOUR_OPTIONS}
            value={form.colour}
            onChange={update('colour')}
          />
        </View>
      </View>

      <View style={styles.row2}>
        <View style={styles.half}>
          <PickerField
            label="Fuel Type"
            placeholder="Select Fuel"
            options={FUEL_OPTIONS}
            value={form.fuel}
            onChange={update('fuel')}
          />
        </View>
        <View style={styles.half}>
          <PickerField
            label="Seating Capacity"
            options={SEAT_OPTIONS}
            value={form.seats}
            onChange={update('seats')}
          />
        </View>
      </View>

      <ThemedText type="smallBold" style={[styles.white, styles.photoTitle]}>
        Vehicle Photos Required
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        You will need to provide clear photos of your vehicle in the next step. Ensure good
        lighting.
      </ThemedText>
      <View style={styles.photoRow}>
        <View style={styles.photoBox}>
          <ThemedText>🚚</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Front Angle
          </ThemedText>
        </View>
        <View style={styles.photoBox}>
          <ThemedText>🚙</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Rear Angle
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate('RegisterDocuments')}>
        <ThemedText style={styles.saveText}>Save Vehicle Details</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backArrow: { color: '#ffffff', fontSize: 20 },
  white: { color: '#ffffff' },
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
  },
  rideIcon: { fontSize: 22 },
  rideText: { flex: 1 },
  check: { color: ACCENT, fontSize: 18 },
  row2: { flexDirection: 'row', gap: Spacing.three },
  half: { flex: 1 },
  photoTitle: { marginTop: Spacing.two },
  photoRow: { flexDirection: 'row', gap: Spacing.three },
  photoBox: {
    flex: 1,
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E3135',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  saveButton: { alignSelf: 'center', marginTop: Spacing.two },
  saveText: { color: ACCENT, fontWeight: '700', textDecorationLine: 'underline' },
});