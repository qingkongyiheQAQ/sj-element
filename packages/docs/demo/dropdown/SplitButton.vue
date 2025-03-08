<script setup lang="ts">
import { type DropdownItemProps, SjMessage } from "sj-element";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];

function handleClick() {
  SjMessage.info("button click");
}
</script>

<template>
  <div class="row">
    <sj-dropdown :items="items">
      <sj-button type="primary">
        Dropdown List
        <sj-icon icon="angle-down" style="margin-left: 8px" />
      </sj-button>
    </sj-dropdown>
    <sj-dropdown
      :items="items"
      type="primary"
      @click="handleClick"
      split-button
    >
      Dropdown List
    </sj-dropdown>
  </div>
</template>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>
