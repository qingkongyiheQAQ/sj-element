<!-- 接收 Collapse.vue 提供的 activeNames（当前展开的项），并决定自身是否展开。同时，它可以监听点击事件并通知 Collapse.vue 切换状态。 -->
<script setup lang="ts">
import type {CollapseItemProps} from './types'
import {inject,computed} from 'vue'
import { COLLAPSE_CTX_KEY } from './constants';
// 如果爆红直接重启ts服务器即可 没有反应过来
import { SjIcon } from 'sj-element';
import transitionEvents from "./transitionEvents";

defineOptions({
  name: 'SjCollapseItem'
})
const props = defineProps<CollapseItemProps>();
const ctx = inject(COLLAPSE_CTX_KEY,void 0)
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name));//如果 props.name 在 activeNames 里，说明当前项应该展开。

function handleClick() {
  if (props.disabled) return;
  ctx?.handleItemClick(props.name);
}
</script>

<template>
    <div
    class="sj-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
    >
    <div
      class="sj-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <span class="sj-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <sj-icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="sj-collapse-item__wapper" v-show="isActive">
        <div class="sj-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>


<style scoped>
@import './style.css';
</style>