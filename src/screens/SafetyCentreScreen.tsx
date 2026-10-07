import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const SOS_RED = '#ef4444';

const CONTACTS = [
  { name: 'Priya (Wife)', phone: '+91 98765 43210' },
  { name: 'Rahul (Brother)', phone: '+91 87654 32109' },
];

export default function SafetyCentreScreen({ navigation }: RootScreenProps<'SafetyCentre'>) {
  const [shareLive, setShareLive] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Safety Centre" />

        <View style={styles.sosCard}>
          <ThemedText type="smallBold" style={styles.sosTitle}>
            Emergency SOS
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Hold to alert emergency services and your trusted contacts immediately.
          </ThemedText>
          <TouchableOpacity
            style={styles.sosButton}
            delayLongPress={3000}
            onLongPress={() => navigation.navigate('SosActive')}>
            <ThemedText style={styles.sosText}>⚠ HOLD FOR 3 SECONDS</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <ThemedText>📍</ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              Share Live Trip
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Automatically share your location and trip status with trusted contacts.
          </ThemedText>
          <View style={styles.toggleRow}>
            <ThemedText type="small" style={styles.accent}>
              {shareLive ? 'Active' : 'Off'}
            </ThemedText>
            <Switch value={shareLive} onValueChange={setShareLive} trackColor={{ true: ACCENT }} />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <ThemedText>🛡️</ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              Insurance Coverage
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            You are protected with ₹10L Term Life & Accidental coverage while online.
          </ThemedText>
          <TouchableOpacity>
            <ThemedText type="small" style={styles.white}>
              View Policy →
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <ThemedText>📖</ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              Safety Guidelines
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Review community standards, de-escalation techniques, and best practices for a safe
            ride experience.
          </ThemedText>
          <TouchableOpacity style={styles.smallButton}>
            <ThemedText type="small" style={styles.white}>
              Read Guidelines
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.contactsCard}>
          <View style={styles.contactsHeader}>
            <ThemedText type="smallBold" style={styles.white}>
              Trusted Contacts
            </ThemedText>
            <ThemedText type="small" style={styles.accent}>
              + ADD
            </ThemedText>
          </View>
          {CONTACTS.map((c) => (
            <View key={c.name} style={styles.contactRow}>
              <View style={styles.contactAvatar}>
                <ThemedText style={styles.white}>{c.name[0]}</ThemedText>
              </View>
              <View style={styles.contactText}>
                <ThemedText type="smallBold" style={styles.white}>
                  {c.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {c.phone}
                </ThemedText>
              </View>
              <ThemedText style={styles.accent}>✓</ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  sosCard: {
    backgroundColor: '#2a1213',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  sosTitle: { color: SOS_RED },
  sosButton: {
    backgroundColor: '#2E3135',
    borderRadius: 12,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  sosText: { color: '#ffffff', fontWeight: '700' },
  card: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  cardTop: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smallButton: {
    backgroundColor: '#2E3135',
    borderRadius: 10,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  contactsCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  contactsHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  contactRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  contactAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2E3135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: { flex: 1 },
});