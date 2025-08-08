import { defineConfig } from '@farmfe/core';
import farmLessPlugin from '@farmfe/js-plugin-less';
// import farmPostcssPlugin from "@farmfe/js-plugin-postcss";
import farmJsPluginSvgr from '@farmfe/js-plugin-svgr';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import * as path from 'node:path';
import antdLess from './antd-less';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  compilation: {
    input: {
      // 可以配置相对或者绝对路径
      index: './src/index.html',
    },
    output: {
      path: 'dist',
      // publicPath: isProd ? 'https://cdn.com' : '/',
      publicPath: isProd ? './' : '/',
      targetEnv: 'browser',
      filename: 'assets/[name]_[hash].[ext]',
      assetsFilename: 'static/[name].[ext]',
    },
    resolve: {
      alias: {
        '@/': path.join(process.cwd(), 'src'),
      },
    },
    external: ['node:fs'],
    sourcemap: isDev ? 'all' : false,
    runtime: {
      isolate: true,
    },
  },
  // Dev Server 相关配置
  server: {
    port: 9000,
    proxy: {},
  },
  // 配置环境变量加载路径
  envDir: 'env',
  // 插件配置
  plugins: [
    [
      '@farmfe/plugin-react',
      {
        refresh: isDev,
        development: isDev,
        runtime: 'automatic',
      },
    ],
    [
      '@farmfe/plugin-sass',
      {
        // 生成 source map，方便调试 Sass → CSS 的编译映射
        sourceMap: true,
        // 在 source map 中包含源文件内容，提高调试可读性
        sourceMapIncludeSources: true,
        // 警告信息仅包含 ASCII 字符，适合终端显示
        alertAscii: true,
        // 警告使用 ANSI 颜色加亮，可提高可读性
        alertColor: true,
        // 在输出 CSS 中加入 @charset "UTF-8" 声明，确保编码兼容
        charset: true,
        // 静默 Sass 依赖库中的警告，仅输出我们源码的警告:contentReference[oaicite:1]{index=1}
        quietDeps: true,
        // 控制编译过程日志的详细程度（false 表示简洁输出）
        verbose: true,
        // CSS 输出风格：'expanded'（可读，多行）或 'compressed'（压缩成一行）
        style: isDev ? 'expanded' : 'compressed',
      },
    ],
    farmLessPlugin({
      lessOptions: {
        modifyVars: antdLess.v5Vars,
      },
    }),
    // PostCSS 处理
    // farmPostcssPlugin(),
    // 集成 svgr。SVGR 是一个用于将 SVG 转换为 React 组件的工具，Farm 提供了 Js 插件来支持 SVGR
    farmJsPluginSvgr({
      svgrOptions: {},
      filters: {
        resolvedPaths: ['src/.*/.*\\.svg$'],
      },
    }),
    // '@farmfe/plugin-react-components',
    // AutoImport({
    //   /** 选项在此 */
    // }),
  ],
  vitePlugins: [
    tanstackRouter({
      target: 'react',
      routesDirectory: 'src/routes',
      // 在开发环境下 autoCodeSplitting: true 会无法加载页面，但是 build 后就正常了
      autoCodeSplitting: isProd,
    }),
  ],
});
