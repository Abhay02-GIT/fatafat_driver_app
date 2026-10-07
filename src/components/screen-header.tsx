import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useNav } from '@/navigation/types';

type Props = {
  title: string;
  showBell?: boolean;
};

export function ScreenHeader({ title, showBell = true }: Props) {
  const navigation = useNav();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ThemedText style={styles.back}>←</ThemedText>
      </TouchableOpacity>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {showBell ? (
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <ThemedText style={styles.bell}>🔔</ThemedText>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#ffffff', fontSize: 20 },
  title: { color: '#ffffff' },
  bell: { fontSize: 18 },
  spacer: { width: 20 },
});