import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const GREEN = '#22C55E';
const AMBER = '#F59E0B';

type DocInfo = {
  title: string;
  number: string;
  issuer: string;
  expiry: string;
  status: string;
  ok: boolean;
  note: string;
};

const VALID_NOTE =
  'This document is currently valid and approved for platform use. We will notify you 30 days before it expires. Keep a physical copy with you during trips.';

const DOCS: Record<string, DocInfo> = {
  license: {
    title: 'Driving Licence',
    number: 'UK07 2019 ****8901',
    issuer: 'RTO Dehradun (UK)',
    expiry: 'Oct 14, 2039',
    status: 'Valid',
    ok: true,
    note: VALID_NOTE,
  },
  rc: {
    title: 'Registration (RC)',
    number: 'UK07 AB ****1234',
    issuer: 'RTO Dehradun (UK)',
    expiry: 'Mar 02, 2037',
    status: 'Valid',
    ok: true,
    note: VALID_NOTE,
  },
  insurance: {
    title: 'Vehicle Insurance',
    number: 'POL-****-5521',
    issuer: 'ICICI Lombard',
    expiry: 'Oct 11, 2026',
    status: 'Expiring soon',
    ok: false,
    note: 'Your insurance policy expires in 3 days. Upload the renewed policy to keep receiving trip requests.',
  },
  'profile-photo': {
    title: 'Profile Photo',
    number: '-',
    issuer: 'Uploaded by you',
    expiry: 'No expiry',
    status: 'Valid',
    ok: true,
    note: 'Your profile photo is approved. Customers see it when you accept their trip.',
  },
  'vehicle-photo': {
    title: 'Vehicle Photo',
    number: '-',
    issuer: 'Uploaded by you',
    expiry: 'No expiry',
    status: 'Valid',
    ok: true,
    note: 'Front and back of your vehicle are clearly visible and approved.',
  },
  police: {
    title: 'Police Verification',
    number: 'PV-****-3307',
    issuer: 'Dehradun Police',
    expiry: 'Jun 20, 2027',
    status: 'Valid',
    ok: true,
    note: VALID_NOTE,
  },
};

function Detail({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <View style={styles.fieldBox}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText style={{ color: color ?? '#ffffff' }}>{value}</ThemedText>
    </View>
  );
}

export default function DocumentDetailScreen({
  navigation,
  route,
}: RootScreenProps<'DocumentDetail'>) {
  const { docId } = route.params;
  const doc = DOCS[docId] ?? DOCS.license;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={doc.title} showBell={false} />

      <View style={styles.previewBox}>
        <View style={styles.maskedPill} />
        <ThemedText style={styles.previewIcon}>🪪</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          PREVIEW MASKED
        </ThemedText>
      </View>

      <ThemedText type="smallBold" style={styles.white}>
        Details
      </ThemedText>
      <Detail label="Document Number" value={doc.number} />
      <Detail label="Issued By" value={doc.issuer} />
      <View style={styles.row2}>
        <View style={styles.half}>
          <Detail label="Expiration Date" value={doc.expiry} />
        </View>
        <View style={styles.half}>
          <Detail label="Status" value={doc.status} color={doc.ok ? GREEN : AMBER} />
        </View>
      </View>

      <View style={styles.infoBox}>
        <ThemedText type="small" themeColor="textSecondary">
          ⓘ {doc.note}
        </ThemedText>
      </View>

      <View style={styles.spacer} />
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate('UploadDocument', { title: doc.title, docId })}>
        <ThemedText style={styles.updateText}>📄 Update Document</ThemedText>
      </TouchableOpacity>
      <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
        Updating your document will place your account under review temporarily.
      </ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C', padding: Spacing.four, gap: Spacing.three },
  white: { color: '#ffffff' },
  previewBox: {
    backgroundColor: '#141517',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Spacing.six,
  },
  maskedPill: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 60,
    height: 16,
    borderRadius: 8,
    backgroundColor: GREEN,
  },
  previewIcon: { fontSize: 24 },
  fieldBox: { backgroundColor: '#141517', borderRadius: 10, padding: Spacing.three, gap: 4 },
  row2: { flexDirection: 'row', gap: Spacing.three },
  half: { flex: 1 },
  infoBox: { backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three },
  spacer: { flex: 1 },
  updateButton: {
    backgroundColor: GREEN,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  updateText: { color: '#0B0B0C', fontWeight: '700' },
  footnote: { textAlign: 'center' },
});