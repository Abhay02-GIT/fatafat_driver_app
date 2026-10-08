import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_PARCEL as parcel } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function ParcelInTransitNavigationScreen({
  navigation,
}: RootScreenProps<'ParcelInTransitNavigation'>) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ThemedText style={styles.white}>✕</ThemedText>
        </TouchableOpacity>
        <View style={styles.etaPill}>
          <ThemedText style={styles.white}>▲ 12 min • 4.2 km</ThemedText>
        </View>
      </SafeAreaView>

      <View style={styles.map}>
        <TouchableOpacity style={styles.crosshair}>
          <ThemedText>◎</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sos} onPress={() => navigation.navigate('SosActive')}>
          <ThemedText style={styles.sosText}>SOS</ThemedText>
        </TouchableOpacity>
        <View style={styles.dropPill}>
          <ThemedText style={styles.white}>📍 Drop-off</ThemedText>
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.deliverRow}>
          <View style={styles.flex}>
            <ThemedText type="smallBold" style={styles.white}>
              Deliver to {parcel.receiver}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              📍 {parcel.dropAddress}
            </ThemedText>
          </View>
          <View style={styles.orangePill} />
        </View>

        <View style={styles.orderRow}>
          <ThemedText>📦</ThemedText>
          <View style={styles.flex}>
            <ThemedText type="smallBold" style={styles.white}>
              Order {parcel.orderId}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {parcel.size} • {parcel.weightKg} kg
            </ThemedText>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Calling')}>
            <ThemedText style={styles.actionIcon}>📞</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <ThemedText style={styles.actionIcon}>💬</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.arriveButton}
          onPress={() => navigation.replace('DropVerificationCod')}>
          <ThemedText style={styles.arriveText}>Arrived at Drop-off →</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  white: { color: '#ffffff' },
  flex: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaPill: {
    backgroundColor: '#141517',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  map: { flex: 1 },
  crosshair: {
    position: 'absolute',
    top: Spacing.four,
    right: Spacing.four,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#141517',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sos: { position: 'absolute', top: Spacing.four * 2 + 36, right: Spacing.four },
  sosText: { color: '#ef4444', fontWeight: '700' },
  dropPill: {
    position: 'absolute',
    top: '40%',
    left: '35%',
    backgroundColor: '#141517',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  sheet: {
    backgroundColor: '#141517',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2E3135',
    alignSelf: 'center',
  },
  deliverRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orangePill: { width: 60, height: 24, borderRadius: 12, backgroundColor: '#F59E0B' },
  orderRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
    backgroundColor: '#0B0B0C',
    borderRadius: 10,
    padding: Spacing.three,
  },
  actionIcon: { fontSize: 18 },
  arriveButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  arriveText: { color: '#0B0B0C', fontWeight: '700' },
});