import type { InitialStateType, AccessType } from "@/models";
import { QueryClient } from "@tanstack/react-query";

/**
 * 路由上下文对象
 */
export type RouteContextType = {
  /**
   * tanstack/react-query 实例对象
   */
  queryClient: QueryClient;
  /**
   * 初始状态
   */
  initialState: InitialStateType,
  /**
   * 权限信息
   */
  access: AccessType;
}
