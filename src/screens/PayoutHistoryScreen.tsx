const navigation = useNav();
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useNav } from '@/navigation/types';

const STATUS_COLORS = {
    Processing: '#F59E0B',
    Completed: '#22C55E',
    Failed: '#ef4444',
};

type Transfer = {
    id: string;
    range: string;
    label: string;
    bank: string;
    amount: number;
    status: keyof typeof STATUS_COLORS;
};

const TRANSFERS: Transfer[] = [
    {
        id: 'p1',
        range: 'Sep 28 - Oct 04',
        label: 'Processing...',
        bank: 'HDFC Bank ****4829',
        amount: 845.5,
        status: 'Processing',
    },
    {
        id: 'p2',
        range: 'Sep 21 - Sep 27',
        label: 'Sep 29, 2026',
        bank: 'HDFC Bank ****4829',
        amount: 720,
        status: 'Completed',
    },
    {
        id: 'p3',
        range: 'Sep 14 - Sep 20',
        label: 'Sep 22, 2026',
        bank: 'HDFC Bank ****4829',
        amount: 884.5,
        status: 'Completed',
    },
    {
        id: 'p4',
        range: 'Sep 07 - Sep 13',
        label: 'Transfer Failed',
        bank: 'SBI ****1122',
        amount: 650,
        status: 'Failed',
    },
];

export default function PayoutHistoryScreen() {
    const total = TRANSFERS.filter((t) => t.status !== 'Failed').reduce(
        (sum, t) => sum + t.amount,
        0,
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <ScreenHeader title="Payout History" />

                <View style={styles.totalCard}>
                    <ThemedText type="small" themeColor="textSecondary">
                        TOTAL TRANSFERRED THIS MONTH
                    </ThemedText>
                    <ThemedText type="title" style={styles.white}>
                        ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </ThemedText>
                    <ThemedText type="small" style={styles.green}>
                        ↗ +12% vs last month
                    </ThemedText>
                </View>

                <View style={styles.sectionHeader}>
                    <ThemedText type="smallBold" style={styles.white}>
                        Recent Transfers
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                        ⇅ Filter
                    </ThemedText>
                </View>

                {TRANSFERS.map((t) => (
                    //   <View key={t.id} style={[styles.card, { borderLeftColor: STATUS_COLORS[t.status] }]}>
                    //     <ThemedText type="small" themeColor="textSecondary">
                    //       {t.range}
                    //     </ThemedText>
                    //     <ThemedText type="smallBold" style={styles.white}>
                    //       {t.label}
                    //     </ThemedText>
                    //     <View style={styles.cardBottom}>
                    //       <ThemedText type="small" themeColor="textSecondary">
                    //         🏦 {t.bank}
                    //       </ThemedText>
                    //       <View style={[styles.amountPill, { backgroundColor: STATUS_COLORS[t.status] }]}>
                    //         <ThemedText type="small" style={styles.amountText}>
                    //           ₹{t.amount.toFixed(2)}
                    //         </ThemedText>
                    //       </View>
                    //     </View>
                    //   </View>
                    <TouchableOpacity
                        key={t.id}
                        style={[styles.card, { borderLeftColor: STATUS_COLORS[t.status] }]}
                        onPress={() => navigation.navigate('PayoutDetail')}>

                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.loadMoreButton}>
                    <ThemedText style={styles.white}>Load More History ⌄</ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0B0B0C' },
    content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
    white: { color: '#ffffff' },
    green: { color: STATUS_COLORS.Completed },
    totalCard: {
        backgroundColor: '#141517',
        borderRadius: 14,
        padding: Spacing.three,
        gap: 4,
    },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.two },
    card: {
        backgroundColor: '#141517',
        borderRadius: 10,
        padding: Spacing.three,
        gap: 4,
        borderLeftWidth: 3,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    amountPill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
    amountText: { color: '#0B0B0C', fontWeight: '700' },
    loadMoreButton: { alignItems: 'center', paddingVertical: Spacing.three },
});