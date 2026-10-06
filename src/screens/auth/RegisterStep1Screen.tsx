import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PickerField } from '@/components/auth/picker-field';
import { ThemedText } from '@/components/themed-text';
import { GENDER_OPTIONS } from '@/constants/options';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const TOTAL_STEPS = 4;
const CURRENT_STEP = 1;

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

function Field({ label, placeholder, value, onChangeText }: FieldProps) {
  return (
    <View style={styles.field}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#60646C"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export default function RegisterStep1Screen({ navigation }: RootScreenProps<'RegisterStep1'>) {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: '',
    city: '',
    contactName: '',
    contactPhone: '',
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
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Rider
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.progressRow}>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Personal Details
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Step {CURRENT_STEP} of {TOTAL_STEPS}
        </ThemedText>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` }]} />
      </View>

      <View style={styles.photoBox}>
        <ThemedText style={styles.photoIcon}>📷</ThemedText>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Profile Photo
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.photoHint}>
          Clear, front-facing image. No sunglasses.
        </ThemedText>
      </View>

      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
        IDENTITY
      </ThemedText>
      <Field
        label="Full Legal Name"
        placeholder="As it appears on your license"
        value={form.fullName}
        onChangeText={update('fullName')}
      />
      <Field
        label="Email Address"
        placeholder="driver@example.com"
        value={form.email}
        onChangeText={update('email')}
      />

      <View style={styles.row2}>
        <View style={styles.half}>
          <Field
            label="Date of Birth"
            placeholder="dd/mm/yyyy"
            value={form.dob}
            onChangeText={update('dob')}
          />
        </View>
        <View style={styles.half}>
          <PickerField
            label="Gender"
            options={GENDER_OPTIONS}
            value={form.gender}
            onChange={update('gender')}
          />
        </View>
      </View>

      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
        OPERATING DETAILS
      </ThemedText>
      <Field
        label="Current City"
        placeholder="e.g. Dehradun"
        value={form.city}
        onChangeText={update('city')}
      />

      <View style={styles.emergencyBox}>
        <ThemedText type="smallBold" style={styles.emergencyLabel}>
          * EMERGENCY CONTACT
        </ThemedText>
        <Field
          label="Contact Name"
          placeholder="Full Name"
          value={form.contactName}
          onChangeText={update('contactName')}
        />
        <Field
          label="Phone Number"
          placeholder="+91 00000 00000"
          value={form.contactPhone}
          onChangeText={update('contactPhone')}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate('RegisterStep2VehicleType')}>
        <ThemedText style={styles.saveText}>Save & Continue →</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backArrow: { color: '#ffffff', fontSize: 20 },
  headerTitle: { color: '#ffffff' },
  headerSpacer: { width: 20 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.two },
  progressTrack: { height: 3, borderRadius: 2, backgroundColor: '#2E3135', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: ACCENT },
  photoBox: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 14,
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.four,
  },
  photoIcon: { fontSize: 28 },
  photoHint: { textAlign: 'center' },
  sectionLabel: { marginTop: Spacing.two },
  field: { gap: Spacing.one },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E3135',
    backgroundColor: '#18191B',
    color: '#ffffff',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 15,
  },
  row2: { flexDirection: 'row', gap: Spacing.three },
  half: { flex: 1, gap: Spacing.one },
  emergencyBox: {
    borderLeftWidth: 2,
    borderLeftColor: '#ef4444',
    paddingLeft: Spacing.three,
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  emergencyLabel: { color: '#ef4444' },
  saveButton: { alignSelf: 'center', marginTop: Spacing.three },
  saveText: { color: ACCENT, fontWeight: '700', textDecorationLine: 'underline' },
});