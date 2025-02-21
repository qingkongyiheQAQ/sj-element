import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
import {resolve} from 'path'

export default defineConfig({
  plugins:[vue()],
  build: {
    // 指定 `UMD` 打包输出目录
    outDir: 'dist/umd',
    // 告诉 Vite 你要构建一个库（Library），而不是普通的 Vue 项目。
    lib:{
      // 组件库入口文件
      entry: resolve(__dirname,"./index.ts"),
      // 决定 UMD 模式下的全局变量名称
      name: "SjElement",
      // 打包后的文件名
      fileName:"index",
      // 选择打包格式
      formats:["umd"]
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