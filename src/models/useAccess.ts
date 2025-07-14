import getAccess from "@/access.ts";
import { useInitialState } from "@/models/useInitialState.ts";
import { create } from "zustand";

export type AccessType = ReturnType<typeof getAccess>;

export const useAccess = create<AccessType>((set) => {
  useInitialState.subscribe(
    (state) => {
      set(getAccess(state.initialState));
    },
  );
  return getAccess(useInitialState.getState().initialState);
})
