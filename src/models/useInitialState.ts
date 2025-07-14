import getAccess from "@/access.ts";
import type { AccessType } from "@/models/useAccess.ts";
import type { Settings as LayoutSettings } from "@ant-design/pro-layout";
import { create } from "zustand";

export type InitialStateType = {
  settings?: Partial<LayoutSettings>;
  currentUser?: SERVER.CurrentUserVo;
  loading?: boolean;
  fetchUserInfo?: () => Promise<SERVER.CurrentUserVo | undefined>;
}

export type UseInitialStateType = {
  /**
   * 初始状态
   */
  initialState: InitialStateType;
  /**
   * 权限信息
   */
  access: AccessType;
  /**
   * 同步设置初始状态
   * @param initialState 初始状态
   */
  setInitialState: (initialState: (InitialStateType | ((initialState: InitialStateType) => InitialStateType))) => void,
  /**
   * 异步设置初始状态
   * @param initialState 初始状态
   */
  setInitialStateAsync: (initialState: (InitialStateType | ((initialState: InitialStateType) => InitialStateType))) => Promise<void>,
  /**
   * 正在加载状态
   */
  loading: boolean;
  /**
   * 错误：未使用到这个字段
   */
  error: any;
}

export const useInitialState = create<UseInitialStateType>((set) => ({
  initialState: {},
  access: getAccess(),
  loading: true,
  error: undefined,
  setInitialState: (initialState: (InitialStateType | ((initialState: InitialStateType) => InitialStateType))) => {
    set((s) => {
      let state: InitialStateType;
      if (typeof initialState === 'function') {
        state = initialState(s.initialState ?? {});
      } else {
        state = initialState;
      }
      const access = getAccess(state);
      return { ...s, initialState: state, access, loading: false };
    });
  },
  setInitialStateAsync: async (initialState: (InitialStateType | ((initialState: InitialStateType) => InitialStateType))) => {
    set((s) => {
      let state: InitialStateType;
      if (typeof initialState === 'function') {
        state = initialState(s.initialState ?? {});
      } else {
        state = initialState;
      }
      const access = getAccess(state);
      return { ...s, initialState: state, access, loading: false };
    });
  },
}))
