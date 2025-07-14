import type { InitialStateType } from "@/models";

// @ts-ignore
export default function getAccess(initialState?: InitialStateType) {
  const { currentUser } = initialState ?? {};
  return {
    check(key: string) {
      return currentUser?.authorities?.includes(key) ?? false;
    }
  }
}
