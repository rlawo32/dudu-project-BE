import { create } from "zustand";

interface joinProgressStore {
    activeProgressTab: string;
    setActiveProgressTab: (tabId: string) => void;
    inputMemberEmail: string;
    setInputMemberEmail: (email: string) => void;
}

const useJoinProgressStore = create<joinProgressStore>((set) => ({
    // 초기
    activeProgressTab: "joinProgress1",
    setActiveProgressTab: (tabId: string) =>
        set((state: {activeProgressTab: string}) => ({
            activeProgressTab: (state.activeProgressTab = tabId),
        })),
    inputMemberEmail: "",
    setInputMemberEmail: (email: string) =>
        set((state: {inputMemberEmail: string}) => ({
            inputMemberEmail: (state.inputMemberEmail = email),
        }))
}));

export default useJoinProgressStore;
export type { joinProgressStore };