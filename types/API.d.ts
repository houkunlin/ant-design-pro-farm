declare namespace API {
  /**
   * 主键类型
   */
  export type IdType = string | number | bigint | null | undefined;
  /**
   * AntDesignPro ProTable 组件的查询参数；表格列表组件的查询参数
   */
  export type PageParams<T = any> = {
    // 当前页
    current?: number;
    // 每页数据数量
    pageSize?: number;
  } & Partial<T>;
  /**
   * 后端返回的分页结果格式
   */
  export type Page<T = any> = {
    // 数据总量
    total?: number;
    // 是否成功，一定为 true 才能被表格列表处理，为 false 时 Table 组件会忽略处理
    success?: boolean;
    // 查询得到的分页数据
    data: T[];
  };
}
