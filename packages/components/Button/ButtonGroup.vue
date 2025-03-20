<script setup lang="ts">
import { BUTTON_GROUP_CTX_KEY } from './constants';
import type { ButtonGroupProps } from './types';
import {provide,reactive,toRef} from 'vue'
defineOptions({
  name:'SjButtonProp'
})
const props=defineProps<ButtonGroupProps>();
provide(
  // 用 reactive() 组合多个 toRef()，确保 props 响应式，
  BUTTON_GROUP_CTX_KEY,
  // toRef 确保 props 变化时，子组件也会自动更新。
  reactive({
    size:toRef(props,'size'),
    type:toRef(props,'type'),
    disabled: toRef(props,"disabled")
  })
)
</script>

<template>
  <div class="sj-button-group">
    <slot></slot>
  </div>
</template>

<style scoped> 
@import './style.css'
</style>