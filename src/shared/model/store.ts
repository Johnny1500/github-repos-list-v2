import { create } from "zustand";
import {
  persist,
  devtools,
  createJSONStorage,
  StateStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { get, set, del } from "idb-keyval";

import { RepositoryEdge } from "./interfaces";

type State = {
  currentPage: number;
  query: string;
  btnCount: number;
  repos: RepositoryEdge[];
};

type Actions = {
  setCurrentPage: (currentPage: State["currentPage"]) => void;
  setQuery: (query: State["query"]) => void;
  setBtnCount: (btnCount: State["btnCount"]) => void;
  setRepos: (edges: State["repos"]) => void;
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
          query: "",
          btnCount: 0,
          repos: [],
          setCurrentPage: (currentPage) =>
            set(
              (state) => {
                state.currentPage = currentPage;
              },
              false,
              "setCurrentPage"
            ),
          setQuery: (query) =>
            set(
              (state) => {
                state.query = query;
              },
              false,
              "setQuery"
            ),
          setBtnCount: (btnCount) =>
            set(
              (state) => {
                state.btnCount = btnCount;
              },
              false,
              "setBtnCount"
            ),
          setRepos: (repos) =>
            set(
              (state) => {
                state.repos = repos;
              },
              false,
              "setRepos"
            ),
        }),
        {
          name: "currentPage",
          partialize: (state) => ({
            currentPage: state.currentPage,
            query: state.query,
          }),
          storage: createJSONStorage(() => storage),
        }
      )
    )
  )
);

export default useStore;
