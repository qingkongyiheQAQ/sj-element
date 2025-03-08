<script setup lang="ts">
import type { MessageProps, MessageCompInstance } from "./types";
import { computed, onMounted, ref, watch } from "vue";
import { getLastBottomOffset } from "./methods";
import { delay, bind } from "lodash-es";
import { useOffset,useEventListener } from "@sj-element/hooks";
import { RenderVnode, typeIconMap } from "@sj-element/utils";
import SjIcon from "../Icon/Icon.vue";
//按ESC全部关闭 鼠标放到消息上停止关闭
defineOptions({
  name: "SjMessage",
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
});
// console.log("props", props,props.onDestroy);

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
// div 的高度
const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),//获取最后一个b底部ottomOffset
  offset: props.offset,//偏移量
  boxHeight,//div的高度
});

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));
let timer: number;
function startTimmer() {
  //自动关闭是失效的 永久不会自动关闭 需要手动关闭 xclose
  if (props.duration === 0) return;
  timer = delay(close, props.duration);//setTimeout
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
}

onMounted(() => {
  visible.value = true;
  startTimmer();
});

// watch(visible, (val) => {
//   console.log("visible 状态变化:", val);
// });

watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset; // 退出动画更流畅
});

useEventListener(document, "keydown", (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === "Escape") {
    close();
  }
});

defineExpose<MessageCompInstance>({
  bottomOffset,
  close,
});
</script>

<template>
  <!-- @enter="boxHeight = messageRef!.getBoundingClientRect().height" -->
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestroy()"
  >
   <!-- :style="cssStyle" -->
    <div
      ref="messageRef"
      class="sj-message"
      :class="{
        [`sj-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <sj-icon class="sj-message__icon" :icon="iconName" />
      <div class="sj-message__content">
        <slot>
          <!-- 如何在组件里面通过参数的方式穿的vnode渲染到组件里 -->
          <render-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="sj-message__close" v-if="showClose">
        <sj-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "./style.css";
</style>
