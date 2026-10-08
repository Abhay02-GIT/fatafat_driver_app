import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function EnRoutePickupScreen({ navigation }: RootScreenProps<'EnRoutePickup'>) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.turnCard}>
        <ThemedText style={styles.turnIcon}>➜</ThemedText>
        <View style={styles.flex}>
          <ThemedText type="smallBold" style={styles.white}>
            Turn right on Rajpur Road
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            In 200 m • 1 min
          </ThemedText>
        </View>
        <ThemedText style={styles.turnIcon}>🔊</ThemedText>
      </SafeAreaView>

      <View style={styles.map}>
        <TouchableOpacity style={styles.crosshair}>
          <ThemedText style={styles.mapIcon}>◎</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sos} onPress={() => navigation.navigate('SosActive')}>
          <ThemedText style={styles.sosIcon}>✱</ThemedText>
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
            <ThemedText type="small" style={styles.amber}>
              ⭐ {trip.rating}
            </ThemedText>
          </View>
          <View style={styles.alignEnd}>
            <ThemedText type="smallBold" style={styles.white}>
              {trip.pickupEtaMin} min
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {trip.pickupDistanceKm} km away
            </ThemedText>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Calling')}>
            <ThemedText style={styles.white}>📞 Call</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Chat')}>
            <ThemedText style={styles.white}>💬 Chat</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.arrivedButton}
          onPress={() => navigation.replace('ArrivedWaiting')}>
          <ThemedText style={styles.arrivedText}>Arrived</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  amber: { color: '#F59E0B' },
  flex: { flex: 1 },
  alignEnd: { alignItems: 'flex-end' },
  turnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    margin: Spacing.four,
    backgroundColor: '#141517',
    borderRadius: 14,
    padding: Spacing.three,
  },
  turnIcon: { fontSize: 18 },
  map: { flex: 1 },
  crosshair: {
    position: 'absolute',
    bottom: Spacing.four,
    left: Spacing.four,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapIcon: { fontSize: 18 },
  sos: {
    position: 'absolute',
    top: Spacing.four,
    right: Spacing.four,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosIcon: { color: '#ef4444', fontSize: 18 },
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
  actionsRow: { flexDirection: 'row', gap: Spacing.two },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#2E3135',
    borderRadius: 10,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  arrivedButton: { alignItems: 'center', paddingVertical: Spacing.one },
  arrivedText: { color: ACCENT, fontWeight: '700' },
});