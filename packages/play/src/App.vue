<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, SjConfigProvider } from "sj-element";
import { get } from "lodash-es";

import { computed, ref,watch } from "vue";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
console.log("language:", language.value);

const locale = computed(() => get(langMap, language.value));


const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
// watch(language, (newLang) => {
//   console.log("🔍 language 改变:", newLang);
//   console.log("🔍 计算出的 locale:", locale.value);
// });


</script>
<template>
  <sj-button @click="changelang" type="info" style="margin-right: 20px">change language</sj-button>
  <sj-config-provider :locale="locale">
    <sj-popconfirm title="Are you sure to delete this item?">
      <sj-button>Delete</sj-button>
    </sj-popconfirm>
  </sj-config-provider>
  <sj-popconfirm lang="zhCn" title="111Are you sure to delete this item?">
    <sj-button>中文</sj-button>
  </sj-popconfirm>



</template>
