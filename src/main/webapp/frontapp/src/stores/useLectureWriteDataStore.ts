import { create } from "zustand";

interface lectureWriteDataStore {
    lectureTimeData: string;
    setLectureTimeData: (time: string) => void;
    lecturePeriodData: string;
    setLecturePeriodData: (period: string) => void;
    lectureReceptionData: string;
    setLectureReceptionData: (reception: string) => void;
}

const useLectureWriteDataStore = create<lectureWriteDataStore>((set) => ({
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
    lectureReceptionData: "",
    setLectureReceptionData: (reception:string) =>
        set((state: {lectureReceptionData:string}) => ({
            lectureReceptionData: (state.lectureReceptionData = reception),
        })),
}));

export default useLectureWriteDataStore;
export type {lectureWriteDataStore};