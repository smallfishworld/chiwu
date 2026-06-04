import { useEffect, useRef } from 'react';
import { useNavigation } from 'expo-router';

/**
 * Calls the provided callback whenever the screen comes into focus.
 * Useful for refreshing data after navigation events (create, edit, delete).
 */
export function useRefreshOnFocus(callback: () => void) {
  const navigation = useNavigation();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callbackRef.current();
    });
    return unsubscribe;
  }, [navigation]);
}
