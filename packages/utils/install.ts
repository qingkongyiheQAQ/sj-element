// 负责所有vue组件的安装
import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

// withInstall 让单个组件支持 app.use()
export const withInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name || "UnnamedComponent";
    app.component(name, component as SFCWithInstall<T>);
  };
  return component as SFCWithInstall<T>;
};
//为methods.ts提供的 this.$message可以直接调用到methods.ts里导出的message
export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn;
  };
  return fn as SFCWithInstall<T>;
};