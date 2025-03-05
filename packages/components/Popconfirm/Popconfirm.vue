<script setup lang="ts">
import { ref, computed } from "vue";
import { addUnit } from "@sj-element/utils";
// import { useLocale } from "@sj-element/hooks";
import type { TooltipInstance } from "../Tooltip"; 
import type { PopconfirmProps, PopconfirmEmits } from "./types";

import SjTooltip from "../Tooltip/Tooltip.vue";
import SjButton from "../Button/Button.vue";
import SjIcon from "../Icon/Icon.vue";

defineOptions({
  name: "SjPopconfirm",
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: "",
  confirmButtonType: "primary",
  cancelButtonText: "No",
  confirmButtonText: "Yes",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
});

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));

// const locale = useLocale();

function hidePopper() {
  tooltipRef.value?.hide();
}

function confirm(e: MouseEvent) {
  emits("confirm", e);
  hidePopper();
}

function cancel(e: MouseEvent) {
  emits("cancel", e);
  hidePopper();
}
</script>

<template>
  <sj-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="sj-popconfirm" :style="style">
        <div class="sj-popconfirm__main">
          <sj-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="sj-popconfirm__action">
          <sj-button
            class="sj-popconfirm__cancel"
            size="small"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText  }}
          </sj-button>
          <sj-button
            class="sj-popconfirm__confirm"
            size="small"
            :type="confirmButtonType"
            @click="confirm"
          >
            {{ confirmButtonText }}
          </sj-button>
        </div>
      </div>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </sj-tooltip>
</template>

<style scoped>
@import "./style.css";
</style>
