import {create} from "zustand";

interface themeToggleStore {
    themeMode: string;
    setThemeMode: (toggle: string) => void;
}

const useThemeToggleStore = create<themeToggleStore>((set) => ({

    themeMode: "light",
    setThemeMode: (toggle: string) =>
        set((state: {themeMode: string}) => ({
            themeMode: (state.themeMode = toggle),
        })),
}));

export default useThemeToggleStore;