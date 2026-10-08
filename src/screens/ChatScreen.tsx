import { useRef, useState, type ComponentRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { CURRENT_TRIP as trip } from '@/constants/trip';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';
const QUICK_REPLIES = ['On my way', 'Reaching in 5 min', 'At the pickup'];

type Message = { id: string; from: 'me' | 'them'; text: string };

const FIRST_MESSAGES: Message[] = [
  { id: 'm1', from: 'me', text: 'I am at the gate near Jakhan Chowk' },
  { id: 'm2', from: 'them', text: 'Ok reaching in 2 min' },
  { id: 'm3', from: 'me', text: 'Please come to the left side' },
  { id: 'm4', from: 'them', text: 'Got it, coming' },
];

export default function ChatScreen({ navigation }: RootScreenProps<'Chat'>) {
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const [messages, setMessages] = useState<Message[]>(FIRST_MESSAGES);
  const [text, setText] = useState('');

  function send(value: string) {
    if (!value.trim()) return;
    setMessages((m) => [...m, { id: String(Date.now()), from: 'me', text: value.trim() }]);
    setText('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ThemedText style={styles.back}>←</ThemedText>
          </TouchableOpacity>
          <View style={styles.flex}>
            <ThemedText type="smallBold" style={styles.white}>
              {trip.rider.split(' ')[0]}
            </ThemedText>
            <ThemedText type="small" style={styles.accent}>
              ● EN ROUTE
            </ThemedText>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Calling')}>
            <ThemedText style={styles.callIcon}>📞</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
          {messages.map((m) => (
            <View
              key={m.id}
              style={[styles.bubble, m.from === 'me' ? styles.bubbleMine : styles.bubbleTheirs]}>
              <ThemedText style={{ color: m.from === 'me' ? '#0B0B0C' : '#ffffff' }}>
                {m.text}
              </ThemedText>
            </View>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickRepliesRow}
          keyboardShouldPersistTaps="handled">
          {QUICK_REPLIES.map((q) => (
            <TouchableOpacity key={q} style={styles.quickReply} onPress={() => send(q)}>
              <ThemedText type="small" style={styles.white}>
                {q}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#60646C"
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => send(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => send(text)}>
            <ThemedText style={styles.sendIcon}>➤</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  flex: { flex: 1 },
  white: { color: '#ffffff' },
  accent: { color: ACCENT },
  header: { flexDirection: 'row', gap: Spacing.three, alignItems: 'center', padding: Spacing.four },
  back: { color: '#ffffff', fontSize: 20 },
  callIcon: { fontSize: 20 },
  messages: { padding: Spacing.four, gap: Spacing.two },
  bubble: {
    maxWidth: '75%',
    borderRadius: 14,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  bubbleMine: { backgroundColor: ACCENT, alignSelf: 'flex-end' },
  bubbleTheirs: { backgroundColor: '#2E3135', alignSelf: 'flex-start' },
  quickRepliesRow: { flexGrow: 0, paddingHorizontal: Spacing.four, marginBottom: Spacing.two },
  quickReply: {
    backgroundColor: '#141517',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    marginRight: Spacing.two,
  },
  inputRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center', padding: Spacing.four },
  input: {
    flex: 1,
    backgroundColor: '#141517',
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    color: '#ffffff',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: { color: '#0B0B0C' },
});