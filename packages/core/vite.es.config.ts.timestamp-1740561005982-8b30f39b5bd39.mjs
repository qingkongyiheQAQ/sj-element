// vite.es.config.ts
import { defineConfig } from "file:///E:/a%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/%E7%BB%83%E4%B9%A0/Vue3/sj-element/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.19/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/a%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/%E7%BB%83%E4%B9%A0/Vue3/sj-element/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.14_@types+node@20.17.19__vue@3.4.19_typescript@5.7.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { readdirSync, readdir } from "fs";
import { delay, defer, filter, map } from "file:///E:/a%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/%E7%BB%83%E4%B9%A0/Vue3/sj-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell2 from "file:///E:/a%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/%E7%BB%83%E4%B9%A0/Vue3/sj-element/node_modules/.pnpm/shelljs@0.8.5/node_modules/shelljs/shell.js";

// hooksPlugin.ts
import { each, isFunction } from "file:///E:/a%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/%E7%BB%83%E4%B9%A0/Vue3/sj-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///E:/a%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/%E7%BB%83%E4%B9%A0/Vue3/sj-element/node_modules/.pnpm/shelljs@0.8.5/node_modules/shelljs/shell.js";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// vite.es.config.ts
import dts from "file:///E:/a%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/%E7%BB%83%E4%B9%A0/Vue3/sj-element/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.19_rollup@4.34.8_typescript@5.7.3_vite@5.4.14_@types+node@20.17.19_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\a\u5DE5\u4F5C\\\u524D\u7AEF\\\u7EC3\u4E60\\Vue3\\sj-element\\packages\\core";
var TRY_MOVE_STYLES_DELAY = 800;
function getDirectoriesSync(basePath) {
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
    defer(() => shell2.mv("./dist/es/theme", "./dist"));
  });
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    hooksPlugin({
      rmFiles: ["./dis t/theme", "./dist/types"],
      afterBuild: moveStyles
    })
  ],
  build: {
    // 指定 `UMD` 打包输出目录
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    // 告诉 Vite 你要构建一个库（Library），而不是普通的 Vue 项目。
    lib: {
      // 组件库入口文件
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
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
        "async-validator"
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
          if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name)) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name;
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
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiLCAiaG9va3NQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxhXHU1REU1XHU0RjVDXFxcXFx1NTI0RFx1N0FFRlxcXFxcdTdFQzNcdTRFNjBcXFxcVnVlM1xcXFxzai1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGFcdTVERTVcdTRGNUNcXFxcXHU1MjREXHU3QUVGXFxcXFx1N0VDM1x1NEU2MFxcXFxWdWUzXFxcXHNqLWVsZW1lbnRcXFxccGFja2FnZXNcXFxcY29yZVxcXFx2aXRlLmVzLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovYSVFNSVCNyVBNSVFNCVCRCU5Qy8lRTUlODklOEQlRTclQUIlQUYvJUU3JUJCJTgzJUU0JUI5JUEwL1Z1ZTMvc2otZWxlbWVudC9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IHJlYWRkaXJTeW5jLCByZWFkZGlyIH0gZnJvbSBcImZzXCI7XHJcbmltcG9ydCB7IGRlbGF5LCBkZWZlciwgZmlsdGVyLCBtYXAgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmltcG9ydCBzaGVsbCBmcm9tIFwic2hlbGxqc1wiO1xyXG5pbXBvcnQgaG9va3MgZnJvbSAnLi9ob29rc1BsdWdpbidcclxuXHJcbi8vIFx1NjI1M1x1NTMwNVx1N0M3Qlx1NTc4QlxyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuXHJcbmNvbnN0IFRSWV9NT1ZFX1NUWUxFU19ERUxBWSA9IDgwMCBhcyBjb25zdDtcclxuXHJcbi8vIFx1ODNCN1x1NTNENiBwYWNrYWdlcyAvIGNvbXBvbmVudHMgXHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0XHU2MjQwXHU2NzA5XHU3RUM0XHU0RUY2XHU2NTg3XHU0RUY2XHU1OTM5XHJcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XHJcbiAgLy8gXHU1NDBDXHU2QjY1XHU4QkZCXHU1M0Q2XHU3NkVFXHU1RjU1XHU1MTg1XHU1QkI5XHVGRjBDXHU1RTc2XHU4RkQ0XHU1NkRFIERpcmVudCBcdTVCRjlcdThDNjFcdTMwMDJcclxuICBjb25zdCBlbnRyaWVzID0gcmVhZGRpclN5bmMoYmFzZVBhdGgsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KTtcclxuICByZXR1cm4gbWFwKFxyXG4gICAgLy8gXHU3QjVCXHU5MDA5XHU1MUZBXHU3NkVFXHU1RjU1XHVGRjA4XHU2NTg3XHU0RUY2XHU1OTM5XHVGRjA5XHJcbiAgICBmaWx0ZXIoZW50cmllcywgKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKSxcclxuICAgIC8vIFx1ODNCN1x1NTNENlx1NjU4N1x1NEVGNlx1NTkzOVx1NzY4NFx1NTQwRFx1NzlGMFx1RkYwQ1x1NUY2Mlx1NjIxMFx1NEUwMFx1NEUyQVx1NjU3MFx1N0VDNFx1MzAwMlxyXG4gICAgKGVudHJ5KSA9PiBlbnRyeS5uYW1lXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZVN0eWxlcygpIHtcclxuICByZWFkZGlyKFwiLi9kaXN0L2VzL3RoZW1lXCIsIChlcnIpID0+IHtcclxuICAgIGlmIChlcnIpIHJldHVybiBkZWxheShtb3ZlU3R5bGVzLCBUUllfTU9WRV9TVFlMRVNfREVMQVkpO1xyXG4gICAgZGVmZXIoKCkgPT4gc2hlbGwubXYoXCIuL2Rpc3QvZXMvdGhlbWVcIiwgXCIuL2Rpc3RcIikpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFt2dWUoKSxcclxuICBkdHMoe1xyXG4gICAgdHNjb25maWdQYXRoOiBcIi4uLy4uL3RzY29uZmlnLmJ1aWxkLmpzb25cIixcclxuICAgIG91dERpcjogXCJkaXN0L3R5cGVzXCIsXHJcbiAgfSksXHJcbiAgaG9va3Moe1xyXG4gICAgcm1GaWxlczogW1wiLi9kaXMgdC90aGVtZVwiLCBcIi4vZGlzdC90eXBlc1wiXSxcclxuICAgIGFmdGVyQnVpbGQ6IG1vdmVTdHlsZXMsXHJcbiAgfSksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgLy8gXHU2MzA3XHU1QjlBIGBVTURgIFx1NjI1M1x1NTMwNVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVxyXG4gICAgb3V0RGlyOiAnZGlzdC9lcycsXHJcbiAgICBtaW5pZnk6IGZhbHNlLFxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgLy8gXHU1NDRBXHU4QkM5IFZpdGUgXHU0RjYwXHU4OTgxXHU2Nzg0XHU1RUZBXHU0RTAwXHU0RTJBXHU1RTkzXHVGRjA4TGlicmFyeVx1RkYwOVx1RkYwQ1x1ODAwQ1x1NEUwRFx1NjYyRlx1NjY2RVx1OTAxQVx1NzY4NCBWdWUgXHU5ODc5XHU3NkVFXHUzMDAyXHJcbiAgICBsaWI6IHtcclxuICAgICAgLy8gXHU3RUM0XHU0RUY2XHU1RTkzXHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL2luZGV4LnRzXCIpLFxyXG4gICAgICAvLyBcdTUxQjNcdTVCOUEgVU1EIFx1NkEyMVx1NUYwRlx1NEUwQlx1NzY4NFx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NTQwRFx1NzlGMFxyXG4gICAgICBuYW1lOiBcIlNqRWxlbWVudFwiLFxyXG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTU0MEVcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcclxuICAgICAgZmlsZU5hbWU6IFwiaW5kZXhcIixcclxuICAgICAgLy8gXHU5MDA5XHU2MkU5XHU2MjUzXHU1MzA1XHU2ODNDXHU1RjBGXHJcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAvLyBcdTRFMERcdTYyNTNcdTUzMDVcdThGRDlcdTRFOUJcdTRGOURcdThENTZcdUZGMENcdTc1MjhcdTYyMzdcdTk3MDBcdTg5ODFcdTgxRUFcdTVERjFcdTVCODlcdTg4QzVcclxuICAgICAgZXh0ZXJuYWw6IFtcclxuICAgICAgICAvLyBlc1x1NEYxQVx1NTNCQlx1NTA1QVx1NEY1M1x1NzlFRlx1NEUwQVx1NzY4NFx1NEYxOFx1NTMxNiBcdTVFOTNcdTkxQ0NcdTRFMERcdTUzMDVcdTU0MkJcdTRGOURcdThENTZcclxuICAgICAgICBcInZ1ZVwiLFxyXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIsXHJcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnNcIixcclxuICAgICAgICBcIkBmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWVcIixcclxuICAgICAgICBcIkBwb3BwZXJqcy9jb3JlXCIsXHJcbiAgICAgICAgXCJhc3luYy12YWxpZGF0b3JcIixcclxuICAgICAgXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgLy8gXHU2NTJGXHU2MzAxXHU2MzA5XHU5NzAwXHU1QkZDXHU1MUZBXHJcbiAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiLFxyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIHZ1ZTogXCJWdWVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gXHU3ODZFXHU0RkREIGluZGV4LmNzcyBcdTRGNUNcdTRFM0FcdTU2RkFcdTVCOUFcdTc2ODRcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjZcdTU0MERcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSBcInN0eWxlLmNzc1wiKSByZXR1cm4gXCJpbmRleC5jc3NcIjtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgYXNzZXRJbmZvLnR5cGUgPT09IFwiYXNzZXRcIiAmJlxyXG4gICAgICAgICAgICAvXFwuKGNzcykkL2kudGVzdChhc3NldEluZm8ubmFtZSBhcyBzdHJpbmcpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGhlbWUvW25hbWVdLltleHRdXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWUgYXMgc3RyaW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gbWFudWFsQ2h1bmtzXHVGRjFBXHU2M0E3XHU1MjM2IFJvbGx1cCBcdTU5ODJcdTRGNTVcdTYyQzZcdTUyMDZcdTRFRTNcdTc4MDFcdTU3NTdcdUZGMENcdTYzRDBcdTlBRDhcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcdTY1NDhcdTczODdcdTMwMDJcclxuICAgICAgICAvLyAgICAgbm9kZV9tb2R1bGVzIFx1OTFDQ1x1NzY4NFx1NEVFM1x1NzgwMVx1NTM1NVx1NzJFQ1x1NjI1M1x1NTMwNVx1NjIxMCB2ZW5kb3IuanNcdTMwMDJcclxuICAgICAgICAvLyAgICAgcGFja2FnZXMvIGhvb2tzIFx1NEUwQlx1NzY4NFx1NEVFM1x1NzgwMVx1NTM1NVx1NzJFQ1x1NjI1M1x1NTMwNVx1NjIxMCBob29rcy5qc1x1MzAwMlxyXG4gICAgICAgIC8vICAgcGFja2FnZXMvIHV0aWxzIFx1OTFDQ1x1NzY4NFx1NURFNVx1NTE3N1x1NTFGRFx1NjU3MFx1NUY1Mlx1NEUzQSB1dGlscy5qc1x1MzAwMlxyXG4gICAgICAgIC8vIFx1N0VDNFx1NEVGNlx1NjU4N1x1NEVGNlx1NTkzOVx1NEUyRFx1NzY4NFx1NTE4NVx1NUJCOVx1NjMwOVx1N0VDNFx1NEVGNlx1NjU4N1x1NEVGNlx1NTkzOVx1NjJDNlx1NTIwNlx1RkYwQ1x1OTA3Rlx1NTE0RFx1NjI0MFx1NjcwOVx1N0VDNFx1NEVGNlx1NjI1M1x1NTMwNVx1NTIzMFx1NTQwQ1x1NEUwMFx1NEUyQVx1NjU4N1x1NEVGNlx1MzAwMlxyXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInZlbmRvclwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL3BhY2thZ2VzL2hvb2tzXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImhvb2tzXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwiL3BhY2thZ2VzL3V0aWxzXCIpIHx8XHJcbiAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwicGx1Z2luLXZ1ZTpleHBvcnQtaGVscGVyXCIpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidXRpbHNcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZvciAoY29uc3QgZGlyTmFtZSBvZiBnZXREaXJlY3Rvcmllc1N5bmMoXCIuLi9jb21wb25lbnRzXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhgL3BhY2thZ2VzL2NvbXBvbmVudHMvJHtkaXJOYW1lfWApKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRpck5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcYVx1NURFNVx1NEY1Q1xcXFxcdTUyNERcdTdBRUZcXFxcXHU3RUMzXHU0RTYwXFxcXFZ1ZTNcXFxcc2otZWxlbWVudFxcXFxwYWNrYWdlc1xcXFxjb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxhXHU1REU1XHU0RjVDXFxcXFx1NTI0RFx1N0FFRlxcXFxcdTdFQzNcdTRFNjBcXFxcVnVlM1xcXFxzai1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcaG9va3NQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2ElRTUlQjclQTUlRTQlQkQlOUMvJUU1JTg5JThEJUU3JUFCJUFGLyVFNyVCQiU4MyVFNCVCOSVBMC9WdWUzL3NqLWVsZW1lbnQvcGFja2FnZXMvY29yZS9ob29rc1BsdWdpbi50c1wiO2ltcG9ydCB7IGVhY2gsIGlzRnVuY3Rpb24gfSBmcm9tIFwibG9kYXNoLWVzXCI7XG5pbXBvcnQgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaG9va3NQbHVnaW4oe1xuICBybUZpbGVzID0gW10sXG4gIGJlZm9yZUJ1aWxkLFxuICBhZnRlckJ1aWxkLFxufToge1xuICBybUZpbGVzPzogc3RyaW5nW107XG4gIGJlZm9yZUJ1aWxkPzogRnVuY3Rpb247XG4gIGFmdGVyQnVpbGQ/OiBGdW5jdGlvbjtcbn0pIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImhvb2tzLXBsdWdpblwiLFxuICAgIGJ1aWxkU3RhcnQoKSB7XG4gICAgICBlYWNoKHJtRmlsZXMsIChmTmFtZSkgPT4gc2hlbGwucm0oXCItcmZcIiwgZk5hbWUpKTtcbiAgICAgIGlzRnVuY3Rpb24oYmVmb3JlQnVpbGQpICYmIGJlZm9yZUJ1aWxkKCk7XG4gICAgfSxcbiAgICBidWlsZEVuZChlcnI/OiBFcnJvcikge1xuICAgICAgIWVyciAmJiBpc0Z1bmN0aW9uKGFmdGVyQnVpbGQpICYmIGFmdGVyQnVpbGQoKTtcbiAgICB9LFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzWCxTQUFTLG9CQUFvQjtBQUNuWixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsYUFBYSxlQUFlO0FBQ3JDLFNBQVMsT0FBTyxPQUFPLFFBQVEsV0FBVztBQUMxQyxPQUFPQSxZQUFXOzs7QUNMOFYsU0FBUyxNQUFNLGtCQUFrQjtBQUNqWixPQUFPLFdBQVc7QUFFSCxTQUFSLFlBQTZCO0FBQUEsRUFDbEMsVUFBVSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFDRixHQUlHO0FBQ0QsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUNYLFdBQUssU0FBUyxDQUFDLFVBQVUsTUFBTSxHQUFHLE9BQU8sS0FBSyxDQUFDO0FBQy9DLGlCQUFXLFdBQVcsS0FBSyxZQUFZO0FBQUEsSUFDekM7QUFBQSxJQUNBLFNBQVMsS0FBYTtBQUNwQixPQUFDLE9BQU8sV0FBVyxVQUFVLEtBQUssV0FBVztBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUNGOzs7QURiQSxPQUFPLFNBQVM7QUFUaEIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTSx3QkFBd0I7QUFHOUIsU0FBUyxtQkFBbUIsVUFBa0I7QUFFNUMsUUFBTSxVQUFVLFlBQVksVUFBVSxFQUFFLGVBQWUsS0FBSyxDQUFDO0FBQzdELFNBQU87QUFBQTtBQUFBLElBRUwsT0FBTyxTQUFTLENBQUMsVUFBVSxNQUFNLFlBQVksQ0FBQztBQUFBO0FBQUEsSUFFOUMsQ0FBQyxVQUFVLE1BQU07QUFBQSxFQUNuQjtBQUNGO0FBRUEsU0FBUyxhQUFhO0FBQ3BCLFVBQVEsbUJBQW1CLENBQUMsUUFBUTtBQUNsQyxRQUFJLElBQUssUUFBTyxNQUFNLFlBQVkscUJBQXFCO0FBQ3ZELFVBQU0sTUFBTUMsT0FBTSxHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFBQSxFQUNuRCxDQUFDO0FBQ0g7QUFFQSxJQUFPLHlCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFBQyxJQUFJO0FBQUEsSUFDZCxJQUFJO0FBQUEsTUFDRixjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsSUFDRCxZQUFNO0FBQUEsTUFDSixTQUFTLENBQUMsaUJBQWlCLGNBQWM7QUFBQSxNQUN6QyxZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDRDtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUE7QUFBQSxJQUVkLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQTtBQUFBLE1BRXRDLE1BQU07QUFBQTtBQUFBLE1BRU4sVUFBVTtBQUFBO0FBQUEsTUFFVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVU7QUFBQTtBQUFBLFFBRVI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQTtBQUFBLFFBRU4sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQTtBQUFBLFFBRUEsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsU0FBUyxZQUFhLFFBQU87QUFDM0MsY0FDRSxVQUFVLFNBQVMsV0FDbkIsWUFBWSxLQUFLLFVBQVUsSUFBYyxHQUN6QztBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU1BLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxpQkFBaUIsR0FBRztBQUNsQyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUNFLEdBQUcsU0FBUyxpQkFBaUIsS0FDN0IsR0FBRyxTQUFTLDBCQUEwQixHQUN0QztBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUNBLHFCQUFXLFdBQVcsbUJBQW1CLGVBQWUsR0FBRztBQUN6RCxnQkFBSSxHQUFHLFNBQVMsd0JBQXdCLE9BQU8sRUFBRSxHQUFHO0FBQ2xELHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsic2hlbGwiLCAic2hlbGwiXQp9Cg==
