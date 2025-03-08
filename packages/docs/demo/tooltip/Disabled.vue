<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(false);
</script>

<template>
  <sj-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <sj-button @click="disabled = !disabled"
      >click to {{ disabled ? "active" : "close" }} tooltip function</sj-button
    >
  </sj-tooltip>
</template>
