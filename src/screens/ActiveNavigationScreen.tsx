import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const AMBER = '#F59E0B';

export default function ActiveNavigationScreen({
    navigation,
}: RootScreenProps<'ActiveNavigation'>) {
    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.turnBanner}>
                <ThemedText style={styles.turnIcon}>⬆️</ThemedText>
                <View>
                    <ThemedText type="smallBold" style={styles.dark}>
                        0.8 km
                    </ThemedText>
                    <ThemedText type="small" style={styles.dark}>
                        Continue on Rajpur Road
                    </ThemedText>
                </View>
            </SafeAreaView>

            <View style={styles.map}>
                <TouchableOpacity style={styles.crosshair}>
                    <ThemedText style={styles.crosshairIcon}>◎</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sos} onPress={() => navigation.navigate('SosActive')}>
                    <ThemedText style={styles.sosText}>SOS</ThemedText>
                </TouchableOpacity>
            </View>

            <SafeAreaView edges={['bottom']} style={styles.sheet}>
                <View style={styles.sheetHandle} />

                <View style={styles.riderRow}>
                    <View style={styles.avatar} />
                    <View style={styles.flex}>
                        <ThemedText type="smallBold" style={styles.white}>
                            {trip.rider}
                        </ThemedText>
                        <ThemedText type="small" style={{ color: AMBER }}>
                            ⭐ {trip.rating}
                        </ThemedText>
                    </View>
                    <View style={styles.alignEnd}>
                        <ThemedText type="smallBold" style={styles.accent}>
                            12 min
                        </ThemedText>
                        <ThemedText type="small" themeColor="textSecondary">
                            4.2 km left
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.dropoffRow}>
                    <ThemedText>📍</ThemedText>
                    <View style={styles.flex}>
                        <ThemedText type="small" themeColor="textSecondary">
                            DROP-OFF
                        </ThemedText>
                        <ThemedText type="smallBold" style={styles.white}>
                            {trip.dropAddress}
                        </ThemedText>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.surgeBox}
                    onPress={() => navigation.navigate('FareMatchDiscount')}>
                    <ThemedText type="small" style={{ color: AMBER }}>
                        ⚡ Fare-Match Active
                    </ThemedText>
                    <ThemedText type="small" style={{ color: AMBER }}>
                        +1.5x Surge
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.endTripButton} onPress={() => navigation.replace('TripComplete')}>
                    <ThemedText style={styles.endTripText}>End Trip</ThemedText>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0B0B0C' },
    white: { color: '#ffffff' },
    dark: { color: '#0B0B0C' },
    accent: { color: ACCENT },
    flex: { flex: 1 },
    alignEnd: { alignItems: 'flex-end' },
    turnBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        backgroundColor: ACCENT,
        padding: Spacing.four,
    },
    turnIcon: { fontSize: 18 },
    map: { flex: 1 },
    crosshair: {
        position: 'absolute',
        bottom: Spacing.four,
        right: Spacing.four,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#141517',
        alignItems: 'center',
        justifyContent: 'center',
    },
    crosshairIcon: { fontSize: 18 },
    sos: { position: 'absolute', top: Spacing.four, right: Spacing.four, padding: Spacing.one },
    sosText: { color: '#ef4444', fontWeight: '700' },
    sheet: {
        backgroundColor: '#141517',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: Spacing.four,
        gap: Spacing.three,
    },
    sheetHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#2E3135',
        alignSelf: 'center',
    },
    riderRow: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2E3135' },
    dropoffRow: {
        flexDirection: 'row',
        gap: Spacing.two,
        backgroundColor: '#0B0B0C',
        borderRadius: 12,
        padding: Spacing.three,
    },
    surgeBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3a2a0b',
        borderRadius: 10,
        padding: Spacing.two,
    },
    endTripButton: {
        backgroundColor: ACCENT,
        borderRadius: 14,
        paddingVertical: Spacing.three,
        alignItems: 'center',
    },
    endTripText: { color: '#0B0B0C', fontWeight: '700' },
});