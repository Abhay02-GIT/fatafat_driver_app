import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { markUploaded } from '@/lib/documents-store';

import type { RootScreenProps } from '@/navigation/types';

const ACCENT = '#22C55E';

export default function UploadDocumentScreen({
  navigation,
  route,
}: RootScreenProps<'UploadDocument'>) {
  const { title, docId } = route.params;
  const insets = useSafeAreaInsets();
  const [docNumber, setDocNumber] = useState('');
  const [expiry, setExpiry] = useState('');

  function upload() {
    markUploaded(docId);
    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.six },
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ThemedText style={styles.backArrow}>←</ThemedText>
      </TouchableOpacity>
      <ThemedText type="subtitle" style={styles.white}>
        Upload {title}
      </ThemedText>

      <View style={styles.infoBox}>
        <ThemedText type="small" themeColor="textSecondary">
          Clear photos are required — ensure all corners are visible, text is legible, and there is
          no glare. Place on a dark background.
        </ThemedText>
      </View>

      <TouchableOpacity style={styles.photoBox}>
        <ThemedText style={styles.photoIcon}>📷</ThemedText>
        <ThemedText type="smallBold" style={styles.white}>
          Scan Front
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.photoBox}>
        <ThemedText style={styles.photoIcon}>🖼️</ThemedText>
        <ThemedText type="smallBold" style={styles.white}>
          Upload Back
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.row2}>
        <TouchableOpacity style={styles.sourceButton}>
          <ThemedText style={styles.white}>📷 Camera</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sourceButton}>
          <ThemedText style={styles.white}>🖼️ Gallery</ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText type="small" themeColor="textSecondary">
        Document Number
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter exact number from card"
        placeholderTextColor="#60646C"
        value={docNumber}
        onChangeText={setDocNumber}
      />

      <ThemedText type="small" themeColor="textSecondary">
        Expiry Date
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="dd/mm/yyyy"
        placeholderTextColor="#60646C"
        value={expiry}
        onChangeText={setExpiry}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={upload}>
        <ThemedText style={styles.uploadText}>Upload Document</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
  content: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  backArrow: { color: '#ffffff', fontSize: 20 },
  white: { color: '#ffffff' },
  infoBox: { backgroundColor: '#141517', borderRadius: 12, padding: Spacing.three },
  photoBox: {
    height: 120,
    borderRadius: 12,
    backgroundColor: '#18191B',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  photoIcon: { fontSize: 26 },
  row2: { flexDirection: 'row', gap: Spacing.three },
  sourceButton: {
    flex: 1,
    backgroundColor: '#18191B',
    borderRadius: 10,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
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
  uploadButton: {
    backgroundColor: ACCENT,
    borderRadius: 14,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  uploadText: { color: '#0B0B0C', fontWeight: '700', fontSize: 16 },
});