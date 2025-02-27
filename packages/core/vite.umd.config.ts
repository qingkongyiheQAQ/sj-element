import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { resolve } from 'path'
import { readFile } from "fs";
import { delay, defer } from "lodash-es";

import shell from "shelljs";
import vue from "@vitejs/plugin-vue"
import hooks from './hooksPlugin'
import terser from '@rollup/plugin-terser'

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";


const TRY_MOVE_STYLES_DELAY = 800 as const;

function moveStyles() {
  readFile("./dist/umd/index.css.gz", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
    hooks({
      rmFiles: ["./dist/umd","./dist/index.css"],
      afterBuild: moveStyles,
    }),
   ],
  build: {
    // 指定 `UMD` 打包输出目录
    outDir: "dist/umd",
    // 告诉 Vite 你要构建一个库（Library），而不是普通的 Vue 项目。
    lib:{
      // 组件库入口文件
      entry: resolve(__dirname,"./index.ts"),
      // 决定 UMD 模式下的全局变量名称
      name: "SjElement",
      // 打包后的文件名
      fileName: "index",
      formats: ["umd"]
      // 选择打包格式
    },
    rollupOptions:{
      // 不打包 Vue，让用户自己安装 Vue
      external:["vue"],
      output:{
        // 支持按需导出
        exports:"named",
        globals:{
          vue:"Vue"
        },
        // 确保 index.css 作为固定的样式文件名
        assetFileNames:(assetsInfo)=>{
          if(assetsInfo.name==="style.css") return "index.css";
          return assetsInfo.name as string;
        }
      }
    }
  }
})