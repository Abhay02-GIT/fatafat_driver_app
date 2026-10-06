import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useUploadedDocs } from '@/lib/documents-store';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const WARNING = '#F59E0B';

const DOCS = [
  { id: 'license', icon: '🪪', title: 'Driving Licence' },
  { id: 'rc', icon: '📄', title: 'Registration (RC)' },
  { id: 'insurance', icon: '🛡️', title: 'Vehicle Insurance' },
  { id: 'profile-photo', icon: '👤', title: 'Profile Photo' },
  { id: 'vehicle-photo', icon: '🚗', title: 'Vehicle Photo', sub: 'Front & Back clearly visible' },
  { id: 'police', icon: '🛡️', title: 'Police Verification' },
];

export default function RegisterDocumentsScreen({
  navigation,
}: RootScreenProps<'RegisterDocuments'>) {
  const insets = useSafeAreaInsets();
  const uploadedIds = useUploadedDocs();
  const allUploaded = DOCS.every((d) => uploadedIds.includes(d.id));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.six },
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ThemedText style={styles.backArrow}>←</ThemedText>
      </TouchableOpacity>

      <ThemedText type="subtitle" style={styles.white}>
        Document Checklist
      </ThemedText>
      <ThemedText themeColor="textSecondary">
        Upload the following documents to activate your profile. Verification usually takes 2-4
        hours.
      </ThemedText>

      {DOCS.map((d) => {
        const uploaded = uploadedIds.includes(d.id);
        return (
          <TouchableOpacity
            key={d.id}
            style={styles.docCard}
            onPress={() => navigation.navigate('UploadDocument', { title: d.title, docId: d.id })}>
            <View style={styles.docTop}>
              <ThemedText style={styles.docIcon}>{d.icon}</ThemedText>
              <View style={styles.requiredBadge}>
                <ThemedText type="small" style={styles.white}>
                  Required
                </ThemedText>
              </View>
            </View>
            <ThemedText type="smallBold" style={styles.white}>
              {d.title}
            </ThemedText>
            {d.sub && (
              <ThemedText type="small" themeColor="textSecondary">
                {d.sub}
              </ThemedText>
            )}
            <ThemedText type="small" style={{ color: uploaded ? ACCENT : WARNING }}>
              {uploaded ? '✓ Uploaded' : '⚠ Not Uploaded'}
            </ThemedText>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[styles.submitButton, allUploaded && styles.submitButtonActive]}
        disabled={!allUploaded}
        onPress={() => navigation.navigate('PayoutSetup')}>
        <ThemedText style={[styles.submitText, allUploaded && styles.submitTextActive]}>
          Submit Documents
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  backArrow: { color: '#ffffff', fontSize: 20 },
  white: { color: '#ffffff' },
  docCard: { backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three, gap: 4 },
  docTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  docIcon: { fontSize: 20 },
  requiredBadge: {
    backgroundColor: '#2E3135',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  submitButton: {
    backgroundColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  submitButtonActive: { backgroundColor: ACCENT },
  submitText: { color: '#B0B4BA', fontWeight: '700', fontSize: 16 },
  submitTextActive: { color: '#0B0B0C' },
});