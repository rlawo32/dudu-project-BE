import { create } from "zustand";

interface lectureSearchDataStore {
    searchText: string;
    setSearchText: (text: string) => void;
}

const useLectureSearchDataStore = create<lectureSearchDataStore>((set) => ({
    searchText: "",
    setSearchText: (text: string) =>
        set((state: {searchText: string}) => ({
            searchText: (state.searchText = text),
        })),
}));

export default useLectureSearchDataStore;
export type { lectureSearchDataStore };