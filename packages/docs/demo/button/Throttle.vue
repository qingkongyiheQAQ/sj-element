<script setup>
function handleBtnClick() {
  console.log("btn click");
}
</script>

<template>
  <p>
    <sj-button @click="handleBtnClick"> with throttle</sj-button>
    <sj-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</sj-button
    >
  </p>
</template>
