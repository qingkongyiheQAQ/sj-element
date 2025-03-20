<script lang="ts" setup>
import { SjMessage } from "sj-element";

const open1 = () => {
  SjMessage({
    showClose: true,
    message: "This is a message.",
  });
};
const open2 = () => {
  SjMessage({
    showClose: true,
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  SjMessage({
    showClose: true,
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  SjMessage({
    showClose: true,
    message: "Oops, this is a error message.",
    type: "danger",
  });
};
</script>

<template>
  <sj-button :plain="true" @click="open1">Message</sj-button>
  <sj-button :plain="true" @click="open2">Success</sj-button>
  <sj-button :plain="true" @click="open3">Warning</sj-button>
  <sj-button :plain="true" @click="open4">Error</sj-button>
</template>
