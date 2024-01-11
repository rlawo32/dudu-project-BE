import { create } from "zustand";

interface lectureWriteDataStore {
    lectureTimeData: string;
    setLectureTimeData: (time:string) => void;
    lecturePeriodData: string;
    setLecturePeriodData: (period:string) => void;
    lectureReceptionData: string;
    setLectureReceptionData: (reception: string) => void;
    lectureScheduleData: {id:number; content:string;}[];
    setLectureScheduleData: (id:number, content:string) => void;
    onChangeLectureSchedule: (content:{id:number; content:string;}[]) => void;
    removeLectureScheduleData: (rmItem:number) => void;
    materialsAndSignificantData: {id:number; content:string;}[];
    setMaterialsAndSignificantData: (id:number, content:string) => void;
    onChangeMaterialsAndSignificant: (content:{id:number; content:string;}[]) => void;
    removeMaterialsAndSignificantData: (rmItem:number) => void;
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
    lectureScheduleData: [{id:0, content:''}],
    setLectureScheduleData: (id:number, content:string) =>
        set((state) => ({
            lectureScheduleData: [...state.lectureScheduleData, {id, content}],
        })),
    onChangeLectureSchedule: (content:{id:number; content:string;}[]) =>
        set((state) => ({
            lectureScheduleData: content
        })),
    removeLectureScheduleData: (rmItem:number) =>
        set((state) => ({
            lectureScheduleData: state.lectureScheduleData.filter((stArr) => stArr.id !== rmItem),
        })),
    materialsAndSignificantData: [{id:0, content:''}],
    setMaterialsAndSignificantData: (id:number, content:string) =>
        set((state) => ({
            materialsAndSignificantData: [...state.materialsAndSignificantData, {id, content}],
        })),
    onChangeMaterialsAndSignificant: (content:{id:number; content:string;}[]) =>
        set((state) => ({
            materialsAndSignificantData: content
        })),
    removeMaterialsAndSignificantData: (rmItem:number) =>
        set((state) => ({
            materialsAndSignificantData: state.materialsAndSignificantData.filter((stArr) => stArr.id !== rmItem),
        })),
}));

export default useLectureWriteDataStore;
export type {lectureWriteDataStore};