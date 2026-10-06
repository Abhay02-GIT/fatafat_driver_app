import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressSteps } from '@/components/auth/progress-steps';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

type Row = { label: string; value: string };

const PERSONAL: Row[] = [
  { label: 'Full Name', value: 'Aman Rawat' },
  { label: 'Phone', value: '+91 98765 43210' },
  { label: 'Address', value: '12 Rajpur Road\nDehradun, UK 248001' },
];

const VEHICLE: Row[] = [
  { label: 'Make & Model', value: 'Honda Activa 6G' },
  { label: 'Year', value: '2022' },
  { label: 'Registration No.', value: 'UK07 AB 1234' },
  { label: 'Colour', value: 'Pearl White' },
];

const DOCUMENTS = ['Driving Licence', 'Vehicle Insurance', 'Registration (RC)'];

const BANK: Row[] = [
  { label: 'Bank Name', value: 'HDFC Bank' },
  { label: 'Account Ending In', value: '•••• 4829' },
];

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <ThemedText type="smallBold" style={styles.white}>
        {icon} {title}
      </ThemedText>
      <ThemedText type="small" style={styles.edit}>
        ✏️ Edit
      </ThemedText>
    </View>
  );
}

function ReviewSection({ icon, title, rows }: { icon: string; title: string; rows: Row[] }) {
  return (
    <View style={styles.section}>
      <SectionHeader icon={icon} title={title} />
      <View style={styles.sectionGrid}>
        {rows.map((r) => (
          <View key={r.label} style={styles.sectionCell}>
            <ThemedText type="small" themeColor="textSecondary">
              {r.label}
            </ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              {r.value}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function RegisterReviewScreen({ navigation }: RootScreenProps<'RegisterReview'>) {
  const insets = useSafeAreaInsets();
  const [declared, setDeclared] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const canSubmit = declared && agreed;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.six },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ThemedText style={styles.backArrow}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText type="smallBold" style={styles.white}>
          Rider
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ThemedText type="smallBold" style={styles.edit}>
        STEP 4 OF 4
      </ThemedText>
      <ProgressSteps current={4} total={4} />

      <ThemedText type="subtitle" style={styles.white}>
        Review & Submit
      </ThemedText>
      <ThemedText themeColor="textSecondary">
        Please review your information carefully before submitting your application. This data
        will be used for your background check.
      </ThemedText>

      <ReviewSection icon="👤" title="Personal Information" rows={PERSONAL} />
      <ReviewSection icon="🚗" title="Vehicle Details" rows={VEHICLE} />

      <View style={styles.section}>
        <SectionHeader icon="📄" title="Documents" />
        {DOCUMENTS.map((d) => (
          <View key={d} style={styles.docRow}>
            <ThemedText type="small" themeColor="textSecondary">
              {d}
            </ThemedText>
            <ThemedText style={styles.edit}>✓</ThemedText>
          </View>
        ))}
      </View>

      <ReviewSection icon="🏦" title="Bank Details" rows={BANK} />

      <ThemedText type="smallBold" style={[styles.white, styles.declarations]}>
        Declarations
      </ThemedText>
      <TouchableOpacity style={styles.checkboxRow} onPress={() => setDeclared((v) => !v)}>
        <View style={[styles.checkbox, declared && styles.checkboxChecked]} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.checkboxText}>
          I declare that all information provided is accurate and true to the best of my
          knowledge.
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreed((v) => !v)}>
        <View style={[styles.checkbox, agreed && styles.checkboxChecked]} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.checkboxText}>
          I agree to the Terms of Service, Privacy Policy, and consent to a background check.
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
        disabled={!canSubmit}
        onPress={() => navigation.navigate('VerificationPending')}>
        <ThemedText style={styles.submitText}>Submit for Verification →</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backArrow: { color: '#ffffff', fontSize: 20 },
  headerSpacer: { width: 20 },
  white: { color: '#ffffff' },
  edit: { color: ACCENT },
  section: {
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  sectionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  sectionCell: { width: '45%', gap: 2 },
  docRow: { flexDirection: 'row', justifyContent: 'space-between' },
  declarations: { marginTop: Spacing.three },
  checkboxRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'flex-start' },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2E3135',
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: ACCENT, borderColor: ACCENT },
  checkboxText: { flex: 1 },
  submitButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  submitButtonDisabled: { opacity: 0.4 },
  submitText: { color: '#0B0B0C', fontWeight: '700', fontSize: 16 },
});