<script lang="ts" setup>
import { SjMessage } from "sj-element";

const openCenter = () => {
  SjMessage({
    showClose: true,
    message: "Centered text",
    center: true
  });
};
</script>

<template>
  <sj-button plain @click="openCenter">Centered text</sj-button>
</template>
