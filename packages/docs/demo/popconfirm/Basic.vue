<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, SjConfigProvider } from "sj-element";
import { get } from "lodash-es";

import { computed, ref } from "vue";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
</script>
<template>
  <sj-button @click="changelang" type="info" style="margin-right: 20px"
    >change language</sj-button
  >
  <sj-config-provider :locale="locale">
    <sj-popconfirm title="Are you sure to delete this item?">
      <sj-button>Delete</sj-button>
    </sj-popconfirm>
  </sj-config-provider>
</template>
