import { create } from "zustand";

interface divisionArr {
    dvItem: string;
}

interface lectureSearchDataStore {
    searchButton: boolean;
    setSearchButton: (text: boolean) => void;
    searchText: string;
    setSearchText: (text: string) => void;
    ltDivisionArr: divisionArr[];
    setLtDivisionArr: (dvItem: string) => void;
    removeLtDivisionArr: (rmItem: string) => void;
    ltState: number;
    setLtState: (item: number) => void;
}

const useLectureSearchDataStore = create<lectureSearchDataStore>((set) => ({
    searchButton: false,
    setSearchButton: (btn: boolean) =>
        set((state: {searchButton: boolean}) => ({
            searchButton: (state.searchButton = btn),
        })),
    searchText: "",
    setSearchText: (text: string) =>
        set((state: {searchText: string}) => ({
            searchText: (state.searchText = text),
        })),
    ltDivisionArr: [],
    setLtDivisionArr: (dvItem: string) =>
        set((state) => ({
            ltDivisionArr: [...state.ltDivisionArr, {dvItem}],
        })),
    removeLtDivisionArr: (rmItem: string) =>
        set((state) => ({
            ltDivisionArr: state.ltDivisionArr.filter((dvArr) => dvArr.dvItem !== rmItem),
        })),
    ltState: 0,
    setLtState: (item: number) =>
        set((state: {ltState: number}) => ({
            ltState: (state.ltState = item),
        })),
}));

export default useLectureSearchDataStore;
export type { lectureSearchDataStore };