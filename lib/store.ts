import { create } from "zustand";

type selectedOptionType = {
  selectedOption: number | null;
  update: (n: number) => void;
  reset: () => void;
};

export const useOptionStore = create<selectedOptionType>((set) => ({
  selectedOption: null,
  update: (n) => set({ selectedOption: n }),
  reset: () => set({ selectedOption: null }),
}));

type TimeStoreType = {
  timeStart: number;
  timeEnd: number;
  isOver: boolean;
  update: (time: number) => void;
  setOver: () => void;
};

export const useTimeStore = create<TimeStoreType>((set) => ({
  timeStart: new Date().getTime(),
  isOver: false,
  timeEnd: new Date().getTime() + 20000,
  update: (time) =>
    set({ timeStart: time, timeEnd: time + 7000, isOver: false }),
  setOver: () => set((state) => ({ ...state, isOver: true })),
}));

export type GameStatsStoreType = {
  currentScore: number;
  questions: { question: string; options: string[] }[];
  updateScore: (v: number) => void;
  updateQuestions: (v: GameStatsStoreType["questions"]) => void;
  state: stateType;
  changeState: (v: stateType) => void;
  reset: () => void;
};

export const useGameStatsStore = create<GameStatsStoreType>((set) => ({
  questions: [],
  currentScore: 0,
  state: "loading",
  reset: () =>
    set({
      questions: [],
      currentScore: 0,
      state: "lobby",
    }),
  changeState: (v) => set((state) => ({ ...state, state: v })),
  updateScore: (v) =>
    set((state) => ({ ...state, currentScore: state.currentScore + v })),
  updateQuestions: (v) => set((state) => ({ ...state, questions: v })),
}));

type stateType = "ready" | "loading" | "lobby";

type GameStoreType = {
  question: null | string;
  options: null | string[];
  currentQuesIndex: null | number;
  changeCurrentIndex: (v: number) => void;
  set: (v: { question: string; options: string[] }) => void;
};

export const useGameStore = create<GameStoreType>((set) => ({
  question: null,
  options: [],
  currentQuesIndex: null,
  changeCurrentIndex: (v) =>
    set((state) => ({ ...state, currentQuesIndex: v })),
  set: (v) => set((state) => ({ ...state, ...v })),
}));

type PlayerStoreType = {
  name: string | null;
  gender: number | null;
  set: (v: { name: string; gender: number; }) => void;
};

export const usePlayerStore = create<PlayerStoreType>((set) => ({
  id: null,
  name: null,
  gender: null,
  set: (v) => set(v),
}));
