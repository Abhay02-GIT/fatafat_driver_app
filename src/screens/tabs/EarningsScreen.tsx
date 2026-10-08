import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useNav } from '@/navigation/types';

const ACCENT = '#22C55E';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAILY = [4350, 6860, 1240, 0, 0, 0, 0];
const TODAY_INDEX = 2;
const WEEKLY_TARGET = 18300;
const CHART_HEIGHT = 90;

export default function EarningsScreen() {
    const navigation = useNav();
    const weekTotal = DAILY.reduce((sum, amount) => sum + amount, 0);
    const progress = Math.min(100, Math.round((weekTotal / WEEKLY_TARGET) * 100));
    const maxAmount = Math.max(...DAILY);

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

                <View style={styles.weekCard}>
                    <ThemedText type="small" themeColor="textSecondary">
                        THIS WEEK
                    </ThemedText>
                    <ThemedText type="title" style={styles.white}>
                        ₹{weekTotal.toLocaleString('en-IN')}
                    </ThemedText>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <ThemedText type="smallBold" style={styles.white}>
                        Daily Earnings
                    </ThemedText>
                    <TouchableOpacity onPress={() => navigation.navigate('EarningsActivity')}>
                        <ThemedText type="small" style={styles.accent}>
                            Details ›
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                <View style={styles.chartCard}>
                    <View style={styles.chart}>
                        {DAILY.map((amount, i) => (
                            <View key={DAYS[i]} style={styles.chartColumn}>
                                <View
                                    style={[
                                        styles.bar,
                                        { height: Math.max(4, (amount / maxAmount) * CHART_HEIGHT) },
                                        i === TODAY_INDEX && styles.barToday,
                                    ]}
                                />
                                <ThemedText
                                    type="small"
                                    style={{
                                        color: i === TODAY_INDEX ? '#ffffff' : '#60646C',
                                        fontWeight: i === TODAY_INDEX ? '700' : '400',
                                    }}>
                                    {DAYS[i]}
                                </ThemedText>
                            </View>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.payoutRow}
                    onPress={() => navigation.navigate('PayoutHistory')}>
                    <View>
                        <ThemedText type="small" themeColor="textSecondary">
                            NEXT PAYOUT
                        </ThemedText>
                        <ThemedText type="smallBold" style={styles.white}>
                            Tomorrow, 9:00 AM
                        </ThemedText>
                    </View>
                    <ThemedText type="small" themeColor="textSecondary">
                        🏦 •••• 4829
                    </ThemedText>
                </TouchableOpacity>

                <View style={styles.row2}>
                    {/* <View style={styles.miniCard}>
            <ThemedText style={styles.miniIcon}>⭐</ThemedText>
            <ThemedText type="smallBold" style={styles.white}>
              Incentives
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              3 trips to ₹500 bonus
            </ThemedText>
          </View> */}

                    <TouchableOpacity style={styles.miniCard} onPress={() => navigation.navigate('WeeklyPlan')}>
                        <ThemedText style={styles.miniIcon}>🛡️</ThemedText>
                        <ThemedText type="smallBold" style={styles.white}>
                            Subscription
                        </ThemedText>
                        <ThemedText type="small" themeColor="textSecondary">
                            Active till Sunday
                        </ThemedText>
                    </TouchableOpacity>



                    <View style={styles.miniCard}>
                        <ThemedText style={styles.miniIcon}>🛡️</ThemedText>
                        <ThemedText type="smallBold" style={styles.white}>
                            Subscription
                        </ThemedText>
                        <ThemedText type="small" themeColor="textSecondary">
                            Active till Sunday
                        </ThemedText>
                    </View>
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
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2E3135' },
    bell: { fontSize: 20 },
    weekCard: {
        backgroundColor: '#141517',
        borderRadius: 14,
        padding: Spacing.three,
        gap: Spacing.two,
    },
    progressTrack: { height: 6, borderRadius: 3, backgroundColor: '#2E3135', overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: ACCENT },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.two },
    chartCard: { backgroundColor: '#141517', borderRadius: 14, padding: Spacing.three },
    chart: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
    chartColumn: { flex: 1, alignItems: 'center', gap: 6 },
    bar: { width: '100%', borderRadius: 4, backgroundColor: '#2E3135' },
    barToday: { backgroundColor: ACCENT },
    payoutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#141517',
        borderRadius: 12,
        padding: Spacing.three,
    },
    row2: { flexDirection: 'row', gap: Spacing.three },
    miniCard: { flex: 1, backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three, gap: 4 },
    miniIcon: { fontSize: 18 },
});