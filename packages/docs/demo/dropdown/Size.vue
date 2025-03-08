<script setup lang="ts">
import { type DropdownItemProps } from "sj-element";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];
</script>

<template>
  <div class="row">
    <sj-dropdown :items="items" size="large" split-button>
      Large List
    </sj-dropdown>
    <sj-dropdown :items="items" split-button> Default List </sj-dropdown>
    <sj-dropdown :items="items" size="small" split-button>
      small List
    </sj-dropdown>
  </div>
</template>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>
