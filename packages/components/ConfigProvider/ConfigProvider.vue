<script setup lang="ts">
import { onMounted,watch } from "vue";

onMounted(() => {
  console.log("🔍 ConfigProvider onMounted 触发！");
});

import type { ConfigProviderProps } from "./types";
import { provideGlobalConfig } from "./hooks";

defineOptions({
  name: "SjConfigProvider",
});
const props = defineProps<ConfigProviderProps>();
const config = provideGlobalConfig(props);
watch(() => props.locale, (newLocale) => {
  console.log("🔍 ConfigProvider 监听到 locale 变化:", newLocale);
});

</script>

<template>
  <slot name="default" :config="config"></slot>
</template>
