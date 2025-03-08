<script lang="ts" setup>
import { h } from "vue";
import { SjMessage } from "sj-element";

const open = () => {
  SjMessage("This is a message.");
};

const openVn = () => {
  SjMessage({
    message: h("p", { style: "line-height: 1; font-size: 14px" }, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
};
</script>

<template>
  <sj-button :plain="true" @click="open">Show message</sj-button>
  <sj-button :plain="true" @click="openVn">VNode</sj-button>
</template>
