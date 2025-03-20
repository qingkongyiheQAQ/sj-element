import type { InjectionKey } from "vue";
import type { ButtonGroupContext } from "./types";
// provide/inject 不会发生命名冲突。
export const BUTTON_GROUP_CTX_KEY:InjectionKey<ButtonGroupContext>=Symbol(
  "BUTTON_GROUP_CTX_KEY"
);