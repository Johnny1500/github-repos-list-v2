import { create } from "zustand";
import {
  persist,
  devtools,
  createJSONStorage,
  StateStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { get, set, del } from "idb-keyval";

type State = {
  currentPage: number;
};

type Actions = {
  setCurrentPage: (currentPage: State["currentPage"]) => void;
};

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

const useStore = create<State & Actions>()(
  devtools(
    immer(
      persist(
        (set) => ({
          currentPage: 0,
          setCurrentPage: (currentPage) =>
            set((state) => {
              state.currentPage = currentPage;
            }),
        }),
        {
          name: "currentPage",
          partialize: (state) => ({
            currentPage: state.currentPage,
          }),
          storage: createJSONStorage(() => storage),
        }
      )
    )
  )
);

export default useStore;
