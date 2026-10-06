import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const ACCENT = '#22C55E';
const LENGTH = 6;

type Focusable = { focus: () => void };

export function OtpInput({ onChange }: { onChange?: (code: string) => void }) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(''));
  const inputs = useRef<Array<Focusable | null>>([]);

  function handleChange(text: string, index: number) {
    const next = [...digits];
    next[index] = text.replace(/\D/g, '').slice(-1);
    setDigits(next);
    onChange?.(next.join(''));

    if (next[index] && index < LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(key: string, index: number) {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  return (
    <View style={styles.row}>
      {digits.map((digit, i) => (
        <TextInput
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
          keyboardType="number-pad"
          maxLength={1}
          style={[styles.box, digit ? styles.boxFilled : null]}
          placeholder="-"
          placeholderTextColor="#60646C"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  box: {
    width: 44,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E3135',
    backgroundColor: '#18191B',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
  boxFilled: { borderColor: ACCENT },
});
