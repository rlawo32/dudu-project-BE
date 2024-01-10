import { create } from "zustand";

interface lectureWriteDataStore {
    lectureTimeData: string;
    setLectureTimeData: (time: string) => void;
    lecturePeriodData: string;
    setLecturePeriodData: (period: string) => void;
    lectureReceptionData: string;
    setLectureReceptionData: (reception: string) => void;
    materialsAndSignificantData: string;
    setMaterialsAndSignificantData: (materialsAndSignificant: string) => void;
    lectureScheduleData: string;
    setLectureScheduleData: (schedule: string) => void;
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
    materialsAndSignificantData: "",
    setMaterialsAndSignificantData: (materialsAndSignificant:string) =>
        set((state: {materialsAndSignificantData:string}) => ({
            materialsAndSignificantData: (state.materialsAndSignificantData = materialsAndSignificant),
        })),
    lectureScheduleData: "",
    setLectureScheduleData: (schedule:string) =>
        set((state: {lectureScheduleData:string}) => ({
            lectureScheduleData: (state.lectureScheduleData = schedule),
        })),
}));

export default useLectureWriteDataStore;
export type {lectureWriteDataStore};