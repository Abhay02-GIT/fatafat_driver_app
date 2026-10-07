import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useNav } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';

type MenuScreen =
  | 'RegisterDocuments'
  | 'PayoutHistory'
  | 'SafetyCentre'
  | 'HelpSupport'
  | 'ReferARider';

type MenuItem = {
  icon: string;
  label: string;
  screen: MenuScreen;
  badge?: 'ok';
  trailing?: string;
};

const MENU: MenuItem[] = [
  { icon: '📄', label: 'Vehicle Documents', screen: 'RegisterDocuments', badge: 'ok' },
  { icon: '💳', label: 'Earnings & Payouts', screen: 'PayoutHistory' },
  { icon: '🛡️', label: 'Safety Centre', screen: 'SafetyCentre' },
  { icon: '❓', label: 'Help & Support', screen: 'HelpSupport' },
  { icon: '👥', label: 'Refer a Rider', screen: 'ReferARider', trailing: 'Earn ₹50' },
];

export default function AccountScreen() {
  const navigation = useNav();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <ThemedText type="subtitle" style={styles.white}>
            Rider
          </ThemedText>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <ThemedText style={styles.bell}>🔔</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View>
            <ThemedText type="subtitle" style={styles.white}>
              Aman Rawat
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Bike Service
            </ThemedText>
          </View>
          <View style={styles.profileRight}>
            <ThemedText type="small" style={styles.amber}>
              ⭐ 4.9
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              2.4k Trips
            </ThemedText>
          </View>
        </View>

        <View style={styles.row2}>
          <View style={styles.statusCard}>
            <View style={styles.statusTop}>
              <ThemedText style={styles.statusIcon}>🚗</ThemedText>
              <ThemedText style={styles.accent}>✓</ThemedText>
            </View>
            <ThemedText type="smallBold" style={styles.white}>
              Vehicle
            </ThemedText>
            <ThemedText type="small" style={styles.accent}>
              Verified
            </ThemedText>
          </View>
          <View style={styles.statusCard}>
            <View style={styles.statusTop}>
              <ThemedText style={styles.statusIcon}>🪪</ThemedText>
              <ThemedText style={styles.accent}>✓</ThemedText>
            </View>
            <ThemedText type="smallBold" style={styles.white}>
              Licence
            </ThemedText>
            <ThemedText type="small" style={styles.accent}>
              Valid till Mar 2031
            </ThemedText>
          </View>
        </View>

        {MENU.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuRow}
            onPress={() => navigation.navigate(item.screen)}>
            <View style={styles.menuLeft}>
              <ThemedText style={styles.menuIcon}>{item.icon}</ThemedText>
              <ThemedText style={styles.white}>{item.label}</ThemedText>
            </View>
            {item.badge === 'ok' && <View style={styles.greenPill} />}
            {item.trailing && (
              <ThemedText type="small" style={styles.accent}>
                {item.trailing}
              </ThemedText>
            )}
            {!item.badge && !item.trailing && <ThemedText themeColor="textSecondary">›</ThemedText>}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
          <ThemedText style={styles.amber}>⇥ Sign Out</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  amber: { color: AMBER },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2E3135' },
  bell: { fontSize: 18 },
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
  },
  profileRight: { alignItems: 'flex-end' },
  row2: { flexDirection: 'row', gap: Spacing.three },
  statusCard: { flex: 1, backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three, gap: 4 },
  statusTop: { flexDirection: 'row', justifyContent: 'space-between' },
  statusIcon: { fontSize: 16 },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
  },
  menuLeft: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
  menuIcon: { fontSize: 18 },
  greenPill: { width: 36, height: 10, borderRadius: 6, backgroundColor: ACCENT },
  signOutButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AMBER,
    borderRadius: 12,
    paddingVertical: Spacing.three,
    marginTop: Spacing.two,
  },
});