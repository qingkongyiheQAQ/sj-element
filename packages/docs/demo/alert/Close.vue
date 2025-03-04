<script setup>
// import { ErMessage } from "sj-element";

function handleClose() {
  // ErMessage.info("close callback");
}
</script>
<template>
  <div class="basic block">
    <sj-alert title="Unclosable alert" type="success" :closable="false" />
    <sj-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
