import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useNav } from '@/navigation/types';

type Props = {
  icon?: string;
  title: string;
  subtitle?: string;
};

export function AuthHeader({ icon, title, subtitle }: Props) {
  const navigation = useNav();

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('Login');
    }
  }

  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <ThemedText style={styles.backArrow}>←</ThemedText>
      </TouchableOpacity>

      {icon && <ThemedText style={styles.icon}>{icon}</ThemedText>}

      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {subtitle && <ThemedText themeColor="textSecondary">{subtitle}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.two, marginBottom: Spacing.four },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  backArrow: { color: '#ffffff', fontSize: 20 },
  icon: { fontSize: 28, marginBottom: Spacing.one },
  title: { color: '#ffffff' },
});