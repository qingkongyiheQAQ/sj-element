<script setup lang="ts">
import { SjButton, SjPopconfirm} from 'sj-element';
function confirm(e: MouseEvent) {
  console.log('confirm', e);
}
function cancel(e: MouseEvent) {
  console.log('cancel', e);
}
</script>

<template>
  <!-- <sj-button type="primary" size="big">11111</sj-button> -->
  <sj-collapse></sj-collapse>
  <sj-popconfirm title="Are you sure to delete this?" @confirm="confirm" @cancel="cancel">
      <sj-button type="primary">Delete</sj-button>
  </sj-popconfirm>
  <sj-button type="primary">按钮</sj-button>
</template>

<style scoped>

</style>
