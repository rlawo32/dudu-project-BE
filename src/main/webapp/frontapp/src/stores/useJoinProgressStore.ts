import { create } from "zustand";

interface joinProgressStore {
    activeProgressTab: string;
    setActiveProgressTab: (tabId: string) => void;
}

const useJoinProgressStore = create<joinProgressStore>((set) => ({
    // 초기
    activeProgressTab: "joinProgress1",
    setActiveProgressTab: (tabId: string) =>
        set((state: {activeProgressTab: string}) => ({
            activeProgressTab: (state.activeProgressTab = tabId),
        }))
}));

export default useJoinProgressStore;
export type { joinProgressStore };