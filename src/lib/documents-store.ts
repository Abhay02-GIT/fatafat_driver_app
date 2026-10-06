import { useSyncExternalStore } from 'react';

let uploaded: string[] = ['profile-photo'];
const listeners = new Set<() => void>();

export function markUploaded(id: string) {
  if (uploaded.includes(id)) return;
  uploaded = [...uploaded, id];
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return uploaded;
}

export function useUploadedDocs() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}