# ant-design-pro-farm

使用 [Farm](https://www.farmfe.org/zh/) 构建编译的 Ant Design Pro 版本

## 目录说明

```
src/
  |- assets         // 静态资源路径，使用 import 导入
  |- components     // 自定义组件
  |- config         // 一些配置
  |- layouts        // 页面布局文件
  |- locales        // 一些国际化数据
  |- models         // 数据状态，当前使用 zustand 库
  |- pages          // 页面组件文件
  |- routes         // 页面路由文件，路由文件会 import 引入 pages 页面组件文件
  |- services       // 一些请求方法调用
  |- store          // 原计划是使用 valtio 库来做一些数据状态管理，但是暂时未使用
  |- utils          // 一些工具类
  |- 404.tsx        // 404 页面组件，在 router.tsx 中会使用到
  |- access.ts      // 雷同 ant design pro 的 access.ts 文件
  |- app.tsx        // 雷同 ant design pro 的 access.ts 文件
  |- global.less    // 雷同 ant design pro 的 access.ts 文件
  |- index.html     // HTML 页面入口，需要在 farm.config.ts 中做对应的配置
  |- index.tsx      // React 入口，在 index.html 中会调用这个文件
  |- loading.tsx    // 页面加载状态组件，在 router.tsx 中会使用到
  |- router.tsx     // tanstack/react-router 应用程序路由配置
  |- typings.d.ts   // 一些类型定义
```

## 如何增加一个页面

- 在 src/routes 下新建一个 tsx 文件
- 运行 npm dev 会自动给这个 tsx 文件更新路由配置信息
- 修改这个 tsx 的组件内容即可
