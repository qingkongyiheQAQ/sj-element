<script lang="ts" setup>
import { SjMessage } from "sj-element";

const open1 = () => {
  SjMessage("This is a message.");
};
const open2 = () => {
  SjMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  SjMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  SjMessage.error("Oops, this is a error message.");
};
</script>

<template>
  <sj-button :plain="true" @click="open2">Success</sj-button>
  <sj-button :plain="true" @click="open3">Warning</sj-button>
  <sj-button :plain="true" @click="open1">Message</sj-button>
  <sj-button :plain="true" @click="open4">Error</sj-button>
</template>
