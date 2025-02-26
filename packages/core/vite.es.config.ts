import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue"
import { resolve } from 'path'
import { readdirSync, readdir } from "fs";
import { delay, defer, filter, map } from "lodash-es";
import shell from "shelljs";
import hooks from './hooksPlugin'

// 打包类型
import dts from 'vite-plugin-dts'

const TRY_MOVE_STYLES_DELAY = 800 as const;

// 获取 packages / components 目录下的所有组件文件夹
function getDirectoriesSync(basePath: string) {
  // 同步读取目录内容，并返回 Dirent 对象。
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    // 筛选出目录（文件夹）
    filter(entries, (entry) => entry.isDirectory()),
    // 获取文件夹的名称，形成一个数组。
    (entry) => entry.name
  );
}

function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}

export default defineConfig({
  plugins: [vue(),
  dts({
    tsconfigPath: "../../tsconfig.build.json",
    outDir: "dist/types",
  }),
  hooks({
    rmFiles: ["./dis t/theme", "./dist/types"],
    afterBuild: moveStyles,
  }),
  ],
  build: {
    // 指定 `UMD` 打包输出目录
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    // 告诉 Vite 你要构建一个库（Library），而不是普通的 Vue 项目。
    lib: {
      // 组件库入口文件
      entry: resolve(__dirname, "./index.ts"),
      // 决定 UMD 模式下的全局变量名称
      name: "SjElement",
      // 打包后的文件名
      fileName: "index",
      // 选择打包格式
      formats: ["es"]
    },
    rollupOptions: {
      // 不打包这些依赖，用户需要自己安装
      external: [
        // es会去做体积上的优化 库里不包含依赖
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // 支持按需导出
        exports: "named",
        globals: {
          vue: "Vue"
        },
        // 确保 index.css 作为固定的样式文件名
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        // manualChunks：控制 Rollup 如何拆分代码块，提高按需加载效率。
        //     node_modules 里的代码单独打包成 vendor.js。
        //     packages/ hooks 下的代码单独打包成 hooks.js。
        //   packages/ utils 里的工具函数归为 utils.js。
        // 组件文件夹中的内容按组件文件夹拆分，避免所有组件打包到同一个文件。
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (
            id.includes("/packages/utils") ||
            id.includes("plugin-vue:export-helper")
          ) {
            return "utils";
          }
          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        },
      }
    }
  }
})