import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useNav } from '@/navigation/types';

const ACCENT = '#22C55E';
const OPEN_HOUR = 7;
const CLOSE_HOUR = 22;

const TODAY_EARNINGS = 1240;
const TODAY_TRIPS = 5;

const DEV_LINKS = [
  { label: 'Cab request', screen: 'IncomingRequest' },
  { label: 'Parcel request', screen: 'DeliveryRequest' },
  { label: 'Carpool request', screen: 'CarpoolTripRequest' },
  { label: 'Pink Scooty request', screen: 'PinkScootyTripRequest' },
  { label: 'Carpool manifest', screen: 'MultiStopManifest' },
  { label: 'Identity check', screen: 'IdentityCheck' },
  { label: 'Pink safety shield', screen: 'SafetyShieldSos' },
  { label: 'Pink safety badge', screen: 'PinkScootySafetyBadge' },
] as const;

function isServiceOpen(now: Date) {
    const hour = now.getHours();
    return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

function timeUntilOpen(now: Date) {
    const opens = new Date(now);
    opens.setHours(OPEN_HOUR, 0, 0, 0);
    if (now.getHours() >= CLOSE_HOUR) {
        opens.setDate(opens.getDate() + 1);
    }
    const minutes = Math.round((opens.getTime() - now.getTime()) / 60000);
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function Header({ title, color = '#ffffff' }: { title: string; color?: string }) {
    const navigation = useNav();

    return (
        <View style={styles.header}>
            <View style={styles.avatar} />
            <ThemedText type="subtitle" style={{ color }}>
                {title}
            </ThemedText>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <ThemedText style={styles.bell}>🔔</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

export default function HomeScreen() {
    const navigation = useNav();
    const [isOnline, setIsOnline] = useState(false);
    const now = new Date();

    if (!isServiceOpen(now)) {
        return (
            <SafeAreaView edges={['top']} style={styles.container}>
                <Header title="Go Online" />
                <View style={styles.centerCard}>
                    <ThemedText style={styles.moon}>🌙</ThemedText>
                    <ThemedText type="subtitle" style={styles.white}>
                        Service Paused
                    </ThemedText>
                    <ThemedText themeColor="textSecondary" style={styles.centerText}>
                        Bike service is available from 7:00 AM to 10:00 PM
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                        SERVICE OPENS IN
                    </ThemedText>
                    <ThemedText type="subtitle" style={styles.white}>
                        {timeUntilOpen(now)}
                    </ThemedText>
                </View>
                <TouchableOpacity style={styles.disabledButton} disabled>
                    <ThemedText themeColor="textSecondary">Go Online</ThemedText>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <Header title={isOnline ? 'Online' : 'Offline'} color={isOnline ? ACCENT : '#ffffff'} />

            {isOnline ? (
                <View style={styles.onlineArea}>
                    <View style={styles.questBanner}>
                        <ThemedText type="smallBold" style={styles.questTitle}>
                            Quest Active
                        </ThemedText>
                        <ThemedText type="small" style={styles.white}>
                            Complete 2 more trips to earn ₹200
                        </ThemedText>
                    </View>

                    {__DEV__ &&
                        DEV_LINKS.map((link) => (
                            <TouchableOpacity
                                key={link.screen}
                                style={styles.devButton}
                                onPress={() => navigation.navigate(link.screen)}>
                                <ThemedText type="small" style={styles.accent}>
                                    [dev] {link.label} →
                                </ThemedText>
                            </TouchableOpacity>
                        ))}

                    <TouchableOpacity style={styles.goOfflineButton} onPress={() => setIsOnline(false)}>
                        <ThemedText themeColor="textSecondary">⏻ Go Offline</ThemedText>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.offlineCard}>
                    <ThemedText type="subtitle" style={styles.white}>
                        You're Offline
                    </ThemedText>
                    <ThemedText themeColor="textSecondary">Tap to start receiving trip requests</ThemedText>
                    <TouchableOpacity style={styles.powerButton} onPress={() => setIsOnline(true)}>
                        <ThemedText style={styles.powerIcon}>⏻</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="smallBold" style={styles.accent}>
                        GO ONLINE
                    </ThemedText>
                </View>
            )}

            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <ThemedText type="small" themeColor="textSecondary">
                        💳 EARNINGS
                    </ThemedText>
                    <ThemedText type="subtitle" style={styles.white}>
                        ₹{TODAY_EARNINGS.toLocaleString('en-IN')}
                    </ThemedText>
                </View>
                <View style={styles.statCard}>
                    <ThemedText type="small" themeColor="textSecondary">
                        🧭 TRIPS
                    </ThemedText>
                    <ThemedText type="subtitle" style={styles.white}>
                        {TODAY_TRIPS}
                    </ThemedText>
                </View>
            </View>
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
    accent: { color: ACCENT },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.two,
    },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2E3135' },
    bell: { fontSize: 20 },
    offlineCard: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
    powerButton: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#2E3135',
        alignItems: 'center',
        justifyContent: 'center',
    },
    powerIcon: { fontSize: 24, color: '#ffffff' },
    onlineArea: { flex: 1, justifyContent: 'flex-end', gap: Spacing.three },
    questBanner: { backgroundColor: '#7C5A0B', borderRadius: 12, padding: Spacing.three },
    questTitle: { color: '#F59E0B' },
    devButton: { alignItems: 'center', paddingVertical: Spacing.two },
    goOfflineButton: { alignItems: 'center', paddingVertical: Spacing.two },
    statsRow: { flexDirection: 'row', gap: Spacing.three, marginBottom: Spacing.four },
    statCard: { flex: 1, backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three, gap: 4 },
    centerCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.two,
        backgroundColor: '#141517',
        borderRadius: 16,
        marginBottom: Spacing.three,
    },
    moon: { fontSize: 40 },
    centerText: { textAlign: 'center' },
    disabledButton: {
        backgroundColor: '#2E3135',
        borderRadius: 14,
        paddingVertical: Spacing.three,
        alignItems: 'center',
        marginBottom: Spacing.four,
    },
});