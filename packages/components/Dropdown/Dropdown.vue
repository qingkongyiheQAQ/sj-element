<script setup lang="ts">
import { computed, ref, provide } from "vue";
import { omit, isNil } from "lodash-es";
import { type ButtonInstance, SjButton, SjButtonGroup } from "../Button/index";
import type { TooltipInstance } from "../Tooltip/types";
import type {
  DropdownProps,
  DropdownItemProps,
  DropdownEmits,
  DropdownInstance,
  DropdownContext,
} from "./types";
import { useId, useDisabledStyle } from "@sj-element/hooks";

import { DROPDOWN_CTX_KEY } from "./constants";

import DropdownItem from "./DropdownItem.vue";
import SjTooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "SjDropdown",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
});
const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();

const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();

const tooltipProps = computed(() =>
  omit(props, ["items", "hideAfterClick", "size", "type", "splitButton"])
);

function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emits("command", e.command);
}
//不是测试环境下使用useDisabledStyle
!TEST && useDisabledStyle();
//依赖注入
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),//规定item的大小
});

defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
});

function toggleDropdown() {
  console.log('Toggle dropdown clicked');
  // 直接调用 show() 来显示菜单
  tooltipRef.value?.show();  // 显示下拉菜单
}
// console.log(triggerRef.value);
// import { onMounted,watch } from 'vue';
// watch(triggerRef, (val) => {
//   console.log("triggerref 状态变化:", val);
// });
// onMounted(() => {
//   console.log("visible 状态变化:", triggerRef.value);
// });
console.log('split-button:', props.splitButton);

</script>

<template>
  <div class="sj-dropdown" :id="`dropdown-${useId().value}`" :class="{ 'is-disabled': props.disabled }" >
    <sj-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <sj-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
      >
        <sj-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </sj-button>
        <sj-button ref="triggerRef" icon="angle-down" @click="toggleDropdown"/>
      </sj-button-group>
      <slot v-else name="default"></slot>

      <template #content>
        <ul class="sj-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command ?? useId().value">
              <dropdown-item v-bind="item" />
            </template>
          </slot>
        </ul>
      </template>
    </sj-tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";

:deep(.sj-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}

</style>
