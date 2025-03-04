export type AlertType = "success" | "info" | "warning" | "danger";

export interface AlertProps {
  title?: string;
  type?: AlertType;
  description?: string;
  effect?: "light" | "dark";
  closable?: boolean;
  center?: boolean;
  showIcon?: boolean;
}
//发送的事件
export interface AlertEmits {
  (e: "close"): void;
}
//实例导出的方法
export interface AlertInstance {
  open(): void;
  close(): void;
}
