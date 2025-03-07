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
import { useDisabledStyle } from "@sj-element/hooks";

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
</script>

<template>
  <div class="sj-dropdown" :class="{ 'is-disabled': props.disabled }">
    <sj-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef?.ref.value"
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
        <sj-button ref="triggerRef" icon="angle-down" />
      </sj-button-group>
      <slot name="default" v-else></slot>

      <template #content>
        <div class="sj-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <dropdown-item v-bind="item" />
            </template>
          </slot>
        </div>
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
