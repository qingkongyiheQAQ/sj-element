import type { Ref, VNode, ComponentInternalInstance } from "vue";

export const messageTypes = [
  "info",
  "success",
  "warning",
  "danger",
  "error",
] as const;
//ts类型声明
export type MessageType = (typeof messageTypes)[number];

export interface MessageHandler {
  close(): void;
}

export type MessageFn = {
  (props: MessageParams): MessageHandler;
  closeAll(type?: MessageType): void;
};

export type MessageTypeFn = (props: MessageParams) => MessageHandler;

export interface Message extends MessageFn {
  success: MessageTypeFn;
  warning: MessageTypeFn;
  info: MessageTypeFn;
  danger: MessageTypeFn;
  error: MessageTypeFn;
}

export interface MessageProps {
  //不带问号就是必传
  id: string;
  message?: string | VNode | (() => VNode);
  duration?: number;
  showClose?: boolean;
  center?: boolean;
  type?: MessageType;
  offset?: number;
  zIndex: number;
  transitionName?: string;
  onDestroy(): void;
}

export type MessageOptions = Partial<Omit<MessageProps, "id">>;
export type MessageParams = string | VNode | MessageOptions;

export interface MessageInstance {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  handler: MessageHandler;
}

export interface MessageCompInstance {
  close(): void;
  bottomOffset?: Ref<number>;//修改
}

export type CreateMessageProps = Omit<
  MessageProps,
  "onDestroy" | "id" | "zIndex"
>;
