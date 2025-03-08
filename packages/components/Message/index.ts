import Message from "./methods";
import { withInstallFunction } from "@sj-element/utils";
// SjMessage 通过 withInstallFunction 处理，使 Message 方法支持 install，从而可以被 app.use() 安装，并全局使用 this.$message。
export const SjMessage = withInstallFunction(Message, "$message");

export * from "./types";
