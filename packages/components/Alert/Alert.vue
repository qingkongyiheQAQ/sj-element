<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from "./types";
import { computed, ref } from "vue";
import { typeIconMap } from "@sj-element/utils";

import SjIcon from "../Icon/Icon.vue";

defineOptions({
    name: "SjAlert"
})
//
const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  type: "info",
  closable: true,
}); 
const emits = defineEmits < AlertEmits > ();
const slots = defineSlots();

const visible = ref(true);
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
const withDescription = computed(() => props.description || slots.default);

function close() {
  visible.value = false;
  emits("close");
}

function open() {
  visible.value = true;
}
defineExpose<AlertInstance> ({
  close,
  open,
});
</script>

<template>
  <transition name="sj-alert-fade">
    <div v-show="visible" class="sj-alert" role="alert" :class="{
      [`sj-alert__${type}`]: type,
      [`sj-alert__${effect}`]: effect,
      'text-center': center,
    }">
    <!-- //左边的Icon图标 -->
      <sj-icon v-if="showIcon" class="sj-alert__icon" :class="{ 'big-icon': withDescription }" :icon="iconName" />
      <div class="sj-alert__content">
        <span class="sj-alert__title" :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="sj-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="sj-alert__close" v-if="closable">
          <sj-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>