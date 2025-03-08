<script lang="ts" setup>
import { SjMessage } from "sj-element";

const open1 = () => {
  SjMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open2 = () => {
  SjMessage.success("Congrats, this is a success message.");
};
</script>
<template>
  <div>
    <sj-button @click="open1">插件式调用</sj-button>
    <sj-button @click="open2">函数式调用</sj-button>
    <sj-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</sj-button>
  </div>
</template>
111