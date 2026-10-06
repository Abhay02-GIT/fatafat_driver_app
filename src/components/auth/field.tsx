import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = TextInputProps & { label: string };

export function Field({ label, style, ...inputProps }: Props) {
  return (
    <View style={styles.field}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <TextInput style={[styles.input, style]} placeholderTextColor="#60646C" {...inputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: Spacing.one },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E3135',
    backgroundColor: '#18191B',
    color: '#ffffff',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 15,
  },
});