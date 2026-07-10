import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  mode: localStorage.getItem('theme_mode') || 'light',
  toggleTheme: () => set((state) => {
    const nextMode = state.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme_mode', nextMode);
    return { mode: nextMode };
  }),
  setTheme: (mode) => {
    localStorage.setItem('theme_mode', mode);
    set({ mode });
  }
}));
export default useThemeStore;
