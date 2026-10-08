import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const TAGS = ['Polite', 'On Time', 'Clean'];
const PLATFORM_FEE = 35;

export default function TripCompleteScreen({ navigation }: RootScreenProps<'TripComplete'>) {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Polite', 'On Time']);

  function toggleTag(tag: string) {
    setSelectedTags((tags) =>
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
    );
  }

  function finish() {
    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconCircle}>
        <ThemedText style={styles.tick}>✓</ThemedText>
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        Trip Complete
      </ThemedText>

      <View style={styles.earningCard}>
        <ThemedText type="small" themeColor="textSecondary">
          FINAL EARNING
        </ThemedText>
        <ThemedText type="title" style={styles.accent}>
          ₹{trip.fare - PLATFORM_FEE}
        </ThemedText>
      </View>

      <View style={styles.rateCard}>
        <ThemedText type="smallBold" style={styles.white}>
          Rate {trip.rider.split(' ')[0]}
        </ThemedText>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((n) => (
            <TouchableOpacity key={n} onPress={() => setRating(n)}>
              <ThemedText style={[styles.star, { color: n <= rating ? '#F59E0B' : '#2E3135' }]}>
                ★
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tagsRow}>
          {TAGS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                style={[styles.tagPill, active && styles.tagPillActive]}
                onPress={() => toggleTag(tag)}>
                <ThemedText type="small" style={{ color: active ? '#0B0B0C' : '#ffffff' }}>
                  {tag}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.submitButton} onPress={finish}>
        <ThemedText style={styles.submitText}>Submit & Go Online</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.stayOfflineButton} onPress={finish}>
        <ThemedText style={styles.white}>Stay Offline</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.four,
    gap: Spacing.three,
  },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: ACCENT,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: { fontSize: 36, color: '#0B0B0C' },
  title: { color: '#ffffff', textAlign: 'center' },
  earningCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    alignItems: 'center',
    gap: 4,
  },
  rateCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.three,
    alignItems: 'center',
  },
  starsRow: { flexDirection: 'row', gap: Spacing.two },
  star: { fontSize: 28 },
  tagsRow: { flexDirection: 'row', gap: Spacing.two },
  tagPill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 16,
    backgroundColor: '#2E3135',
  },
  tagPillActive: { backgroundColor: ACCENT },
  spacer: { flex: 1 },
  submitButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  submitText: { color: '#0B0B0C', fontWeight: '700' },
  stayOfflineButton: {
    borderWidth: 1,
    borderColor: '#2E3135',
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
});