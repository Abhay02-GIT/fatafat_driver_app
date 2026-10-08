import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';
const STANDARD_FEE_RATE = 0.25;
const WEEKLY_PASS_PRICE = 399;
const WEEKLY_PASS_FEE_RATE = 0.05;
const AVG_FARE = 250;
const MIN_TRIPS = 10;
const MAX_TRIPS = 100;

const BENEFITS = [
  'Keep 95% of all trip fares',
  'Zero hidden surge fees',
  'Priority dispatch on airport runs',
];

export default function WeeklyPlanScreen({ navigation }: RootScreenProps<'WeeklyPlan'>) {
  const [trips, setTrips] = useState(40);

  const gross = trips * AVG_FARE;
  const standardCost = gross * STANDARD_FEE_RATE;
  const passCost = WEEKLY_PASS_PRICE + gross * WEEKLY_PASS_FEE_RATE;
  const savings = Math.max(0, standardCost - passCost);
  const progress = ((trips - MIN_TRIPS) / (MAX_TRIPS - MIN_TRIPS)) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Weekly Plan" showBell={false} />

        <View style={styles.iconBox}>
          <ThemedText style={styles.icon}>💰</ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.title}>
          Max Earnings Plan
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          Pay a flat fee and keep 95% of every fare. Stop paying high commissions on long trips.
        </ThemedText>

        <View style={styles.planCard}>
          <View style={styles.planTop}>
            <ThemedText type="subtitle" style={styles.white}>
              Weekly Pass
            </ThemedText>
            <View style={styles.priceBox}>
              <ThemedText type="subtitle" style={styles.white}>
                ₹{WEEKLY_PASS_PRICE}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                per week
              </ThemedText>
            </View>
          </View>
          {BENEFITS.map((b) => (
            <View key={b} style={styles.benefitRow}>
              <ThemedText style={styles.accent}>✓</ThemedText>
              <ThemedText style={styles.white}>{b}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.calcCard}>
          <ThemedText type="smallBold" style={styles.white}>
            🧮 Savings Calculator
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            See how much you save based on your weekly trip volume compared to the standard 25%
            commission rate.
          </ThemedText>

          <View style={styles.tripsRow}>
            <ThemedText type="smallBold" style={styles.white}>
              Estimated Weekly Trips
            </ThemedText>
            <ThemedText type="smallBold" style={{ color: AMBER }}>
              {trips}
            </ThemedText>
          </View>
          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => setTrips((n) => Math.max(MIN_TRIPS, n - 5))}>
              <ThemedText style={styles.white}>−</ThemedText>
            </TouchableOpacity>
            <View style={styles.stepperTrack}>
              <View style={[styles.stepperFill, { width: `${progress}%` }]} />
            </View>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => setTrips((n) => Math.min(MAX_TRIPS, n + 5))}>
              <ThemedText style={styles.white}>+</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.compareRow}>
            <View style={styles.compareBox}>
              <ThemedText type="small" themeColor="textSecondary">
                Standard (25% fee)
              </ThemedText>
              <ThemedText type="smallBold" style={styles.white}>
                ₹{standardCost.toFixed(0)}
              </ThemedText>
            </View>
            <View style={styles.compareBox}>
              <ThemedText type="small" themeColor="textSecondary">
                Weekly Pass (₹399 + 5%)
              </ThemedText>
              <ThemedText type="smallBold" style={styles.accent}>
                ₹{passCost.toFixed(0)}
              </ThemedText>
            </View>
          </View>

          <View style={styles.savingsRow}>
            <ThemedText style={styles.white}>Your Weekly Savings</ThemedText>
            <View style={styles.savingsPill}>
              <ThemedText style={styles.savingsText}>₹{savings.toFixed(0)}</ThemedText>
            </View>
          </View>
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
          Subscription auto-renews weekly. Cancel anytime before the next billing cycle. Tolls and
          taxes remain 100% yours. Read full terms.
        </ThemedText>

        <TouchableOpacity style={styles.subscribeButton} onPress={() => navigation.goBack()}>
          <ThemedText style={styles.subscribeText}>Subscribe Now →</ThemedText>
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
  centerText: { textAlign: 'center' },
  title: { color: '#ffffff', textAlign: 'center' },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 24 },
  planCard: {
    backgroundColor: '#0f2a17',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ACCENT,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  planTop: { flexDirection: 'row', justifyContent: 'space-between' },
  priceBox: { alignItems: 'flex-end' },
  benefitRow: { flexDirection: 'row', gap: Spacing.two },
  calcCard: {
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  tripsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stepperRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  stepperButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2E3135',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E3135',
    overflow: 'hidden',
  },
  stepperFill: { height: '100%', backgroundColor: AMBER },
  compareRow: { flexDirection: 'row', gap: Spacing.two },
  compareBox: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    borderRadius: 10,
    padding: Spacing.two,
    gap: 4,
  },
  savingsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  savingsPill: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
  },
  savingsText: { color: '#0B0B0C', fontWeight: '700' },
  subscribeButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  subscribeText: { color: '#0B0B0C', fontWeight: '700' },
});