import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const GREEN = '#22C55E';
const AMBER = '#F59E0B';
const MUTED = '#60646C';

type Stage = { label: string; done: boolean; active?: boolean };

const STAGES: Stage[] = [
  { label: 'Submitted', done: true },
  { label: 'Reviewing', done: false, active: true },
  { label: 'Approval', done: false },
];

const DOCS = [
  { label: 'Driving Licence', status: 'Approved', color: GREEN },
  { label: 'Registration (RC)', status: 'Under Review', color: AMBER },
  { label: 'Police Verification', status: 'Cleared', color: GREEN },
];

function stageColor(stage: Stage) {
  if (stage.done) return GREEN;
  return stage.active ? AMBER : MUTED;
}

function stageIcon(stage: Stage) {
  if (stage.done) return '✓';
  return stage.active ? '⏳' : '🔒';
}

export default function VerificationPendingScreen({
  navigation,
}: RootScreenProps<'VerificationPending'>) {
  const goHome = () => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.white}>
          Rider
        </ThemedText>
        <TouchableOpacity style={styles.closeButton} hitSlop={12} onPress={goHome}>
          <ThemedText style={styles.closeText}>✕</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.iconCircle}>
        <ThemedText style={styles.icon}>📋</ThemedText>
      </View>

      <ThemedText type="subtitle" style={styles.title}>
        Verification Pending
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        We're reviewing your documents. This usually takes 24-48 hours. We'll notify you once
        you're ready to go online.
      </ThemedText>

      <View style={styles.stagesRow}>
        {STAGES.map((s) => (
          <View key={s.label} style={styles.stage}>
            <ThemedText style={[styles.stageIcon, { color: stageColor(s) }]}>
              {stageIcon(s)}
            </ThemedText>
            <ThemedText type="small" style={{ color: stageColor(s) }}>
              {s.label}
            </ThemedText>
          </View>
        ))}
      </View>

      <ThemedText type="smallBold" style={styles.white}>
        Document Status
      </ThemedText>
      {DOCS.map((d) => (
        <View key={d.label} style={styles.docRow}>
          <ThemedText type="small" themeColor="textSecondary">
            {d.label}
          </ThemedText>
          <ThemedText type="small" style={{ color: d.color }}>
            {d.status}
          </ThemedText>
        </View>
      ))}

      <TouchableOpacity style={styles.secondaryButton} onPress={goHome}>
        <ThemedText style={styles.white}>🔄 Check Status</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <ThemedText style={styles.white}>🎧 Contact Support</ThemedText>
      </TouchableOpacity>

      {__DEV__ && (
        <TouchableOpacity onPress={() => navigation.navigate('VerificationRejected')}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.devLink}>
            [dev] preview rejected state
          </ThemedText>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  white: { color: '#ffffff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  closeButton: { padding: Spacing.one },
  closeText: { color: '#ffffff', fontSize: 18 },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#141517',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  icon: { fontSize: 36 },
  title: { color: '#ffffff', textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  stagesRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: Spacing.two },
  stage: { alignItems: 'center', gap: 4 },
  stageIcon: { fontSize: 18 },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#141517',
    borderRadius: 10,
    padding: Spacing.three,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  devLink: { textAlign: 'center' },
});