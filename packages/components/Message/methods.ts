//将SFC以指令式的方式挂载到页面上
import type {
  CreateMessageProps,
  MessageInstance,
  MessageFn,
  Message,
  MessageParams,
  MessageHandler,
  MessageProps,
  MessageType,
} from "./types";
import { messageTypes } from "./types";
import { render, createVNode, shallowReactive, isVNode } from "vue";
import { findIndex , each, set, isString ,get} from "lodash-es";
import { useId, useZIndex } from "@sj-element/hooks";
import MessageConstructor from "./Message.vue";
const instances: MessageInstance[] = shallowReactive([]);
const { nextZIndex } = useZIndex();

export const messageDefaults = {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
} as const;
//将options转换为CreateMessageProps
function normalizeOptions(options: MessageParams): CreateMessageProps {
  const result =
    !options || isVNode(options) || isString(options)
      ? {
          message: options,
        }
      : options;

  return { ...messageDefaults, ...result } as CreateMessageProps;
}
//重点
function createMessage(props: CreateMessageProps): MessageInstance {
  const id = useId().value;
  // const id = `message_${seed++}`;
  const container = document.createElement("div");

  const destroy = () => {
    // console.log("执行 destroy()，Message 组件将被移除,id",id,instances);
    const idx = findIndex(instances, { id });
    // console.log('idx',idx);
    if (idx === -1) return;

    instances.splice(idx, 1);
    // console.log(`实例移除后，剩余: ${instances.length}`);
  //我自己手动加的 解决测试用例
    const msgElement = document.querySelector(".sj-message");
    if (msgElement) {
      msgElement.remove();
      // console.log("手动移除 .sj-message");
    }
    // render(null, container);
    
  };

  const _props:MessageProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,//onDestroy是types里定义的
  };

  const vnode = createVNode(MessageConstructor, {..._props});
//把h生成的虚拟DOM render到container上
  render(vnode, container);
  // const el = container.firstElementChild;
  // console.log("container内部有元素",el,"el结束")
  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;
  const handler: MessageHandler = {
    close: () => vm.exposed!.close(),
  };
  const instance: MessageInstance = {
    props: _props,
    id,
    vm,
    vnode,
    handler,
  };
  instances.push(instance);

  return instance;
}

export const message: MessageFn & Partial<Message> = function (options = {}) {
  const normalized = normalizeOptions(options);
  const instance = createMessage(normalized);

  return instance.handler;
};
//  这个函数期望被某个 MessageProps 作为 this 上下文调用
export function getLastBottomOffset(this: MessageProps) {
  const idx = findIndex(instances, { id: this.id });
  if (idx <= 0) return 0; //没找到 说明是第一个

  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

export function closeAll(type?: MessageType) {
  each(instances, (instance) => {
    if (type) {
      instance.props.type === type && instance.handler.close();
      return;
    }
    instance.handler.close();
  });
}

each(messageTypes, (type) =>
  set(message, type, (options: MessageParams) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type });
  })
);
//解决message爆红
message.closeAll = closeAll;

export default message as Message;
