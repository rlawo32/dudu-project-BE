import {create} from "zustand";

interface themeToggleStore {
    themeMode: boolean;
    setThemeMode: (toggle: boolean) => void;
}

const useThemeToggleStore = create<themeToggleStore>((set) => ({

    themeMode: false,
    setThemeMode: (toggle: boolean) =>
        set((state: {themeMode: boolean}) => ({
            themeMode: (state.themeMode = toggle),
        })),
}));
export default useThemeToggleStore;