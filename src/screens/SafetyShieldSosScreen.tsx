import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const PINK = '#ec4899';

export default function SafetyShieldSosScreen({ navigation }: RootScreenProps<'SafetyShieldSos'>) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <ThemedText style={styles.bannerText}>🛡️ Safe Ride Guaranteed Protection Active</ThemedText>
        </View>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ThemedText style={styles.back}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.white}>
            Safety Shield & SOS
          </ThemedText>
          <View style={styles.womenOnlyPill}>
            <ThemedText type="small" style={styles.white}>
              📍 WOMEN ONLY
            </ThemedText>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <ThemedText style={{ color: PINK }}>● Live Location Sharing Active</ThemedText>
            <View style={styles.toggleOn} />
          </View>
          <View style={styles.divider} />
          <ThemedText type="smallBold" style={styles.white}>
            Emergency Contacts Notified
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            👥 Husband, Mom, and 1 other are tracking this trip live.
          </ThemedText>
          <ThemedText type="smallBold" style={styles.white}>
            Secured Dispatch Connection
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            🛡️ Dedicated Pink dispatch control room is monitoring your route.
          </ThemedText>
        </View>

        <View style={styles.routeCard}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            ROUTE PATROL ACTIVE
          </ThemedText>
        </View>

        <TouchableOpacity style={styles.sosButton} onPress={() => navigation.navigate('SosActive')}>
          <ThemedText type="smallBold" style={styles.white}>
            CRITICAL EMERGENCY
          </ThemedText>
          <ThemedText style={styles.sosLine}>Immediate Police & Dispatch Alarm</ThemedText>
          <ThemedText type="small" style={styles.sosLine}>
            Pressing will alert emergency services, sound the alarm, and share instant audio
            recording.
          </ThemedText>
          <ThemedText type="title" style={styles.white}>
            SOS
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportButton}>
          <ThemedText style={{ color: PINK }}>📞 Call Pink Support Desk</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  banner: { backgroundColor: PINK, borderRadius: 10, padding: Spacing.two, alignItems: 'center' },
  bannerText: { color: '#ffffff', fontWeight: '700' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#ffffff', fontSize: 20 },
  womenOnlyPill: {
    backgroundColor: PINK,
    borderRadius: 12,
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
  },
  card: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleOn: { width: 40, height: 22, borderRadius: 11, backgroundColor: PINK },
  divider: { height: 1, backgroundColor: '#2E3135', marginVertical: Spacing.one },
  routeCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    minHeight: 60,
  },
  sosButton: {
    backgroundColor: '#3a1216',
    borderRadius: 14,
    padding: Spacing.four,
    gap: Spacing.two,
    alignItems: 'center',
  },
  sosLine: { color: '#fde2e2', textAlign: 'center' },
  supportButton: {
    borderWidth: 1,
    borderColor: PINK,
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
});