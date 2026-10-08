import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

export default function RequestExpiredScreen({ navigation }: RootScreenProps<'RequestExpired'>) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconCircle}>
        <ThemedText style={styles.icon}>⏰</ThemedText>
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        Request Expired
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        The time to accept this offer has passed. Don't worry, you are still online and will
        receive more requests soon.
      </ThemedText>
      <View style={styles.statusPill}>
        <ThemedText style={styles.statusText}>● Online</ThemedText>
      </View>

      <View style={styles.spacer} />
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] })}>
        <ThemedText style={styles.white}>Return to Home</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: Spacing.six,
  },
  white: { color: '#ffffff' },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.six,
  },
  icon: { fontSize: 32 },
  title: { color: '#ffffff' },
  subtitle: { textAlign: 'center' },
  statusPill: {
    backgroundColor: '#0f2a17',
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  statusText: { color: '#22C55E' },
  spacer: { flex: 1 },
  homeButton: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 12,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.six,
    marginBottom: Spacing.four,
  },
});