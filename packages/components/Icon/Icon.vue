<script setup lang="ts">
  import type { IconProps } from './types';
  import {FontAwesomeIcon}  from '@fortawesome/vue-fontawesome'
  import { omit } from 'lodash-es';
  import {computed} from 'vue';
  defineOptions({
    name: "SjIcon",
    // inheritAttrs: false 防止了 attrs 被自动传递到组件的根 <div> 元素。你可以通过 v-bind="$attrs" 手动绑定这些属性到特定的元素上，或者完全控制它们的传递方式。
    inheritAttrs: false
  })
  const props=defineProps<IconProps>()
  const filterProps=computed(()=>omit(props,["type","color"]))
  // computed() 需要返回一个对象 直接{}会被认为代码块
  const customStyles=computed(()=>({color: props.color??void 0}))
</script>

<template>
  <i
    class="sj-icon"
    :class="[`sj-icon-${props.type}`]"
    :style="customStyles"
    v-bind="$attrs"  
  >
    <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
  </i>
  
</template>

<style scoped>
@import "./style.css";
</style>