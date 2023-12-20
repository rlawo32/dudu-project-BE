import { create } from "zustand";

interface lectureDataStore {
    lectureTimeData: string;
    setLectureTimeData: (time: string) => void;
    lecturePeriodData: string;
    setLecturePeriodData: (period: string) => void;
}

const useLectureDataStore = create<lectureDataStore>((set) => ({
    lectureTimeData: "",
    setLectureTimeData: (time:string) =>
        set((state: {lectureTimeData:string}) => ({
            lectureTimeData: (state.lectureTimeData = time),
        })),
    lecturePeriodData: "",
    setLecturePeriodData: (period:string) =>
        set((state: {lecturePeriodData:string}) => ({
            lecturePeriodData: (state.lecturePeriodData = period),
        })),
}));

export default useLectureDataStore;
export type {lectureDataStore};