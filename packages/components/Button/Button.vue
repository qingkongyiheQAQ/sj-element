<script setup lang="ts">
import { ref, computed, inject } from "vue";
import type { ButtonProps,ButtonEmits,ButtonInstance } from './types';
import { throttle } from "lodash-es";
import SjIcon from "../Icon/Icon.vue";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
  defineOptions({
    name:'SjButton'
  })
  // props 由 父组件 传入。
  const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  // plain: false
  // round: false,
  // circle: false,
  // disabled: false,
  // loading: false
  useThrottle:true,
  throttleDuration:600
});
// 表示按钮的内容由外部传入
const slots = defineSlots();
// 创建一个 Vue ref，用于获取 <button> 的 DOM 节点。  可以用来手动操作按钮
const _ref = ref<HTMLButtonElement>();

const ctx = inject(BUTTON_GROUP_CTX_KEY,void 0);

const size=computed(()=>ctx?.size??props?.size??"")
const type = computed(()=>ctx?.type??props?.type??"")
const disabled = computed(()=>ctx?.disabled||props?.disabled||false)
const emits=defineEmits<ButtonEmits>();
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));
const loadingIcon = computed(() => props.loadingIcon ?? "spinner");

const handleBtnClick=(e:MouseEvent)=>emits('click',e);
// 关闭 trailing 触发，即节流间隔结束后不会额外执行一次。
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false }
);

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type
})
</script>

<template>
  <component
    ref="_ref"
    class="sj-button"
    :is="tag"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`sj-button--${type}`]: type,
      [`sj-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e:MouseEvent)=>useThrottle?handleBtnClickThrottle(e):handleBtnClick(e)"
  >
  <template v-if="loading">
    <!-- 提供一个 具名插槽，允许父组件传入自定义 loading 图标。 -->
      <slot name="loading">
        <sj-icon
          class="loading-icon"
          :icon="loadingIcon"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <!-- 只有在 icon 存在且 loading 为 false 时，才显示普通图标。 -->
    <sj-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />
  <!-- 可以传入文本 -->
    <slot></slot>
  </component>
</template>
<style scoped>
@import './style.css'
</style>