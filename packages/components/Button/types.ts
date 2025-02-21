import type { Component, ComputedRef, Ref } from "vue";
// 按钮类型
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
// <button> 标签的 type
export type NativeType = "button" | "reset" | "submit";
// 按钮尺寸 
export type ButtonSize = "large" | "default" | "small";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  loadingIcon?: string;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
}

export interface ButtonGroupProps {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}
// 用于 provide / inject 传递数据，让 Button 组件可以获取 ButtonGroup 的 size / type / disabled
export interface ButtonGroupContext {
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

/**
 * @group Button
 */
// 定义 Button 组件的事件类型，也就是当 Button 被点击时，会触发 click 事件，并且 click 事件的参数必须是 MouseEvent。
export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

/**
 * @group Button
 */
// 定义 Button 组件的实例对象包含的内容
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
  disabled: ComputedRef<boolean>;
  size: ComputedRef<ButtonSize | "">;
  type: ComputedRef<ButtonType | "">;
}