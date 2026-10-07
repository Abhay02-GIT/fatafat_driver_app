import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useNav } from '@/navigation/types';

const ACCENT = '#22C55E';
const RED = '#ef4444';

type Trip = {
  id: string;
  group: string;
  icon: string;
  type: string;
  time: string;
  distance: string;
  fare: number;
  status: 'Completed' | 'Cancelled';
  pickup: string;
  drop: string;
};

const TRIPS: Trip[] = [
  {
    id: 't1',
    group: 'Yesterday',
    icon: '🚗',
    type: 'Premium Cab',
    time: '2:45 PM',
    distance: '4.2 km',
    fare: 345.5,
    status: 'Completed',
    pickup: 'Clock Tower, Paltan Bazaar',
    drop: 'Dehradun Railway Station',
  },
  {
    id: 't2',
    group: 'Yesterday',
    icon: '🛺',
    type: 'Auto',
    time: '9:15 AM',
    distance: '1.8 km',
    fare: 85,
    status: 'Cancelled',
    pickup: 'Rajpur Road, Jakhan',
    drop: 'Ballupur Chowk',
  },
  {
    id: 't3',
    group: 'Monday, Oct 5',
    icon: '🚗',
    type: 'Economy Cab',
    time: '6:30 PM',
    distance: '12.5 km',
    fare: 520,
    status: 'Completed',
    pickup: 'IT Park, Sahastradhara Road',
    drop: 'Clement Town',
  },
];

function TripCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  const cancelled = trip.status === 'Cancelled';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardTop}>
        <View style={styles.cardTopLeft}>
          <ThemedText style={styles.tripIcon}>{trip.icon}</ThemedText>
          <View>
            <ThemedText type="smallBold" style={styles.white}>
              {trip.type}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {trip.time} • {trip.distance}
            </ThemedText>
          </View>
        </View>
        <View style={styles.cardTopRight}>
          <ThemedText
            type="smallBold"
            style={[styles.white, cancelled && styles.fareCancelled]}>
            ₹{trip.fare.toFixed(2)}
          </ThemedText>
          <ThemedText type="small" style={{ color: cancelled ? RED : ACCENT }}>
            {cancelled ? '⊗ Cancelled' : '✓ Completed'}
          </ThemedText>
        </View>
      </View>

      <View style={styles.routeRow}>
        <View style={styles.dotWhite} />
        <ThemedText type="small" themeColor="textSecondary">
          {trip.pickup}
        </ThemedText>
      </View>
      <View style={styles.routeRow}>
        <View style={styles.dotOrange} />
        <ThemedText type="small" themeColor="textSecondary">
          {trip.drop}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

export default function TripsScreen() {
  const navigation = useNav();
  const groups = [...new Set(TRIPS.map((t) => t.group))];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="subtitle" style={styles.white}>
          Trip History
        </ThemedText>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <ThemedText themeColor="textSecondary">🔍 Search locations...</ThemedText>
          </View>
          <TouchableOpacity style={styles.calendarButton}>
            <ThemedText>📅</ThemedText>
          </TouchableOpacity>
        </View>

        {groups.map((group) => (
          <View key={group} style={styles.group}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              {group}
            </ThemedText>
            {TRIPS.filter((t) => t.group === group).map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onPress={() => navigation.navigate('TripDetails')}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { padding: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.six },
  white: { color: '#ffffff' },
  searchRow: { flexDirection: 'row', gap: Spacing.two },
  searchBox: {
    flex: 1,
    backgroundColor: '#141517',
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: { gap: Spacing.two },
  card: {
    backgroundColor: '#141517',
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTopLeft: { flexDirection: 'row', gap: Spacing.two },
  cardTopRight: { alignItems: 'flex-end' },
  tripIcon: { fontSize: 20 },
  fareCancelled: { color: RED, textDecorationLine: 'line-through' },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  dotWhite: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffffff' },
  dotOrange: { width: 8, height: 8, borderRadius: 2, backgroundColor: '#F59E0B' },
});