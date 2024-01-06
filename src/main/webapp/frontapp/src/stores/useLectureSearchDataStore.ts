import { create } from "zustand";

interface lectureSearchDataStore {
    searchButton: boolean;
    setSearchButton: (text: boolean) => void;
    searchText: string;
    setSearchText: (text: string) => void;
    ltDivisionArr: {idx:number; dvItem:string}[];
    setLtDivisionArr: (idx: number, dvItem: string) => void;
    removeLtDivisionArr: (rmItem: string) => void;
    ltStateArr: {idx:number; stItem:number; stName:string}[];
    setLtStateArr: (idx: number, stItem: number, stName:string) => void;
    removeLtStateArr: (rmItem: number) => void;
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
    setLtDivisionArr: (idx: number, dvItem: string) =>
        set((state) => ({
            ltDivisionArr: [...state.ltDivisionArr, {idx, dvItem}],
        })),
    removeLtDivisionArr: (rmItem: string) =>
        set((state) => ({
            ltDivisionArr: state.ltDivisionArr.filter((dvArr) => dvArr.dvItem !== rmItem),
        })),
    ltStateArr: [],
    setLtStateArr: (idx: number, stItem: number, stName: string) =>
        set((state) => ({
            ltStateArr: [...state.ltStateArr, {idx, stItem, stName}],
        })),
    removeLtStateArr: (rmItem: number) =>
        set((state) => ({
            ltStateArr: state.ltStateArr.filter((stArr) => stArr.stItem !== rmItem),
        })),
}));

export default useLectureSearchDataStore;
export type { lectureSearchDataStore };