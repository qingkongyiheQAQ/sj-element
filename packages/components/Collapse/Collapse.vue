<script setup lang="ts">
import type {CollapseEmits,CollapseProps,CollapseItemName} from './types'
import {ref,provide,watch, watchEffect} from 'vue'
import { COLLAPSE_CTX_KEY } from './constants';
import { debugWarn } from "@sj-element/utils";

const COMP_NAME='SjCollapse' as const;


defineOptions({
  name: COMP_NAME,
})
const props =defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames=ref(props.modelValue);

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME,"accordion mode should only have one active item");
  }
});

function handleItemClick(item:CollapseItemName){
  let _activeNames = [...activeNames.value];

  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? "" : item];
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    _activeNames.splice(index, 1);
  } else {
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
}
function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  // 父组件 App.vue 的 @update:modelValue 事件
  emits("update:modelValue", newNames);
  emits("change", newNames);//通知父组件 Collapse 组件状态变更
}
watch(
  () => props.modelValue,// 监听 props.modelValue 变化
  (newNames) => updateActiveNames(newNames)// 当 modelValue 变化时，执行 updateActiveNames
);


provide(COLLAPSE_CTX_KEY,{
  //激活项
  activeNames,
  //点击项
  handleItemClick
})

</script>

<template> 
  <div class="sj-collapse">
    <slot></slot>

  </div>
</template>

<style scoped>
@import './style.css';
</style>