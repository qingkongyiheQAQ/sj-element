<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { createPopper, type Instance } from "@popperjs/core";
import { ref, watchEffect, watch, computed, onUnmounted, type Ref } from "vue";
import { bind, debounce, type DebouncedFunc } from "lodash-es";
import { useClickOutside } from "@sj-element/hooks";
import useEventsToTiggerNode from "./useEventsToTiggerNode";
import type { ButtonInstance } from "../Button";

//tooltipProps后续会在dropdown组件中使用 所以在上面重新定义一份 单独供Tooltip组件使用
interface _TooltipProps extends TooltipProps {
  virtualRef?: ButtonInstance | HTMLElement | void;  //虚拟触发节点
  virtualTriggering?: boolean;  //是否开启虚拟触发
}

//采用大驼峰写法 模版可以多一种写法选择 并且与原生组件库做区分
defineOptions({
  name: "SjTooltip",
});
const props = withDefaults(defineProps<_TooltipProps>(), {
  // 默认在底下去弹出
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  showTimeout: 0,
  hideTimeout: 200,//控制显示和隐藏的延时
});

const emits = defineEmits<TooltipEmits>();
const visible = ref(false);
const events: Ref<Record<string, EventListener>> = ref({});
const outerEvents: Ref<Record<string, EventListener>> = ref({});
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});//弹出层事件

const containerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();// 虚拟触发 允许通过 代码控制 Tooltip，而不依赖鼠标事件

const triggerNode = computed(() => {
  if (props.virtualTriggering) {
    return (props.virtualRef as HTMLElement) ?? _triggerNode.value;
  }
  return _triggerNode.value as HTMLElement;
});

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));

const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0
);
const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hideTimeout : 0
);

const triggerStrategyMap: Map<string, () => void> = new Map();
triggerStrategyMap.set("hover", () => {
  events.value["mouseenter"] = openFinal;
  outerEvents.value["mouseleave"] = closeFinal;
  dropdownEvents.value["mouseenter"] = openFinal;
});
triggerStrategyMap.set("click", () => {
  events.value["click"] = togglePopper;
});
triggerStrategyMap.set("contextmenu", () => {
  events.value["contextmenu"] = (e) => {
    e.preventDefault();
    openFinal();
  };
});


let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;

function openFinal() {
  // 在打开 tooltip 前取消关闭防抖，并执行打开防抖。
  closeDebounce?.cancel();
  openDebounce?.();
}

function closeFinal() {
  // 在关闭 tooltip 前取消打开防抖，并执行关闭防抖。
  openDebounce?.cancel();
  closeDebounce?.();
}
function togglePopper() {
  // 根据当前可见状态切换调用 openFinal 或 closeFinal。
  visible.value ? closeFinal() : openFinal();
}
// 设置 tooltip 的显示状态，并发出 "visible-change" 事件，同时判断 props.disabled 来决定是否生效。
function setVisible(val: boolean) {
  if (props.disabled) return;
  visible.value = val;
  emits("visible-change", val);
}

function attachEvents() {
  if (props.disabled || props.manual) return;
  // if(props.trigger ==="hover"){
  //   events.value["mouseenter"] = openFinal;
  //   outerEvents.value["mouseleave"] = closeFinal;
  //   dropdownEvents.value["mouseenter"] = openFinal;
  //   return;
  // }
  // if(props.trigger==="click"){
  //   events.value["click"] = togglePopper;
  // }
  // if(props.trigger==="contextmenu"){
  //   events.value["contextmenu"] = (e)=>{
  //     e.preventDefault();
  //     openFinal();
  //   }
  // }
  triggerStrategyMap.get(props.trigger)?.();
}
function resetEvents() {
  events.value = {};
  outerEvents.value = {};
  dropdownEvents.value = {};

  attachEvents();
}
const show: TooltipInstance["show"] = openFinal;
const hide: TooltipInstance["hide"] = function () {
  openDebounce?.cancel();
  setVisible(false);
};
watch(
  visible,
  (val) => {
    if (!val) return;
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
    }
  },
  { flush: "post" }
);

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      resetEvents();
      return;
    }
    attachEvents();
  }
);
watch(
  () => props.trigger,
  () => {
    openDebounce?.cancel();
    visible.value = false;
    emits("visible-change", false);
    resetEvents();
  }
);
let popperInstance: null | Instance;

function destroyPopperInstance() {
    popperInstance?.destroy();
    popperInstance = null;
}

watchEffect(() => {
  if (!props.manual) {
    attachEvents();
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

useClickOutside(containerNode, () => {
  emits("click-outside");
  if (props.trigger === "hover" || props.manual) return;

  visible.value && closeFinal();
});

useEventsToTiggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel();
  setVisible(false);
});

onUnmounted(() => {
  destroyPopperInstance();
});

defineExpose<TooltipInstance>({
  show,
  hide,
});
</script>
<template>
  <div class="sj-tooltip" ref="containerNode" v-on="outerEvents">
    <!-- //没有打开虚拟触发 -->
    <div class="sj-tooltip__trigger" ref="_triggerNode" v-on="events" v-if="!virtualTriggering">
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div class="sj-tooltip__popper" ref="popperNode" v-on="dropdownEvents" v-if="visible">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import "./style.css"
</style>