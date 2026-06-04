import { useSettingsStore } from '../stores/useSettingsStore';
import { useRefreshOnFocus } from './useRefreshOnFocus';

export function useCategories() {
  const categories = useSettingsStore((s) => s.categories);
  const loadCategories = useSettingsStore((s) => s.loadCategories);
  const isLoading = useSettingsStore((s) => s.isLoading);

  useRefreshOnFocus(loadCategories);

  return { categories, isLoading, loadCategories };
}
