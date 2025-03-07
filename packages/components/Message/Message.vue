<script setup lang="ts">
import type { MessageProps } from "./types";
import { computed, onMounted, ref, watch } from "vue";
import { getLastBottomOffset } from "./methods";
import { delay, bind } from "lodash-es";
import { useEventListener, useOffset } from "@sj-element/hooks";
import {  typeIconMap } from "@sj-element/utils";
import SjIcon from "../Icon/Icon.vue";

defineOptions({
  name: "SjMessage",
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
});

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

// // div 的高度
// const boxHeight = ref(0);

// const { topOffset, bottomOffset } = useOffset({
//   getLastBottomOffset: bind(getLastBottomOffset, props),
//   offset: props.offset,
//   boxHeight,
// });

// const cssStyle = computed(() => ({
//   top: topOffset.value + "px",
//   zIndex: props.zIndex,
// }));

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

// useEventListener(document, "keydown", (e: Event) => {
//   const { code } = e as KeyboardEvent;
//   if (code === "Escape") {
//     close();
//   }
// });

// watch(visible, (val) => {
//   if (!val) boxHeight.value = -props.offset; // 退出动画更流畅
// });

// defineExpose({
//   bottomOffset,
//   close,
// });
</script>

<template>
  <!-- @enter="boxHeight = messageRef!.getBoundingClientRect().height" -->
  <Transition
    :name="transitionName"
    @after-leave="!visible && onDestory()"
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
