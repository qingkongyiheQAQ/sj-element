<script setup lang="ts">
import { ref } from "vue";
import {
  SjMessage
  // type ButtonType,
} from "sj-element";

const openVal = ref(["a"]);
const loading = ref(false);
const dropdownOptions = ref([
  {
    label: "Option A",
    // name: 'a'
  },
  {
    label: "Option B",
    // name: 'b'
  },
  {
    label: "Option C",
    // name: 'c',
    divided: true,
  },
]);

function handleBtnClick() {
  SjMessage.info("Button Click");
}

setInterval(() => {
  loading.value = !loading.value;
  // let loadingHandle = ErLoading.service();
  // if (loading.value) {
  //   loadingHandle = ErLoading.service();
  // } else {
  //   loadingHandle?.close();
  // }
}, 2000);


</script>

<template>
  <div>
    <p>
      <sj-button @click="handleBtnClick" :use-throttle="false"
        >Default</sj-button
      >
      <sj-button type="primary">Primary</sj-button>
      <sj-button type="success" @click="console.log('click')"
        >Success</sj-button
      >
      <sj-button type="info">Info</sj-button>
      <sj-button type="warning">Warning</sj-button>
      <sj-popconfirm title="Are you sure to delete this?">
        <sj-button type="danger">Danger</sj-button>
      </sj-popconfirm>
    </p>
    <p>
      <sj-button plain>Plain</sj-button>
      <sj-button type="primary" plain>Primary</sj-button>
      <sj-button type="success" plain>Success</sj-button>
      <sj-button type="info" plain>Info</sj-button>
      <sj-button type="warning" plain>Warning</sj-button>
      <sj-button type="danger" plain>Danger</sj-button>
    </p>
    <p>
      <sj-button round>Round</sj-button>
      <sj-button type="primary" round>Primary</sj-button>
      <sj-button type="success" round>Success</sj-button>
      <sj-button type="info" round>Info</sj-button>
      <sj-button type="warning" round loading>Warning</sj-button>
      <sj-button type="danger" round>Danger</sj-button>
    </p>
    <p>
      <sj-button icon="search" circle />
      <sj-button type="primary" icon="edit" circle />
      <sj-button type="success" icon="check" circle />
      <sj-button type="info" icon="message" circle />
      <sj-button type="warning" icon="star" circle />
      <sj-button type="danger" icon="trash" circle />
    </p>
    <p>
      <sj-button-group size="small" type="primary">
        <sj-button round>Round</sj-button>
        <sj-button type="primary" round>Primary</sj-button>
        <sj-button type="success" round>Success</sj-button>
        <sj-button type="info" round>Info</sj-button>
        <sj-button type="warning" round loading>Warning</sj-button>
        <sj-button type="danger" round>Danger</sj-button>
      </sj-button-group>
    </p>
    <sj-collapse v-model="openVal" accordion>
      <sj-collapse-item name="a" title="Title a">
        <h1>headline title</h1>
        <div>this is content a</div>
      </sj-collapse-item>
      <sj-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </sj-collapse-item>
      <sj-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </sj-collapse-item>
    </sj-collapse>
  </div>

  <sj-dropdown :items="dropdownOptions" size="small" split-button
    >dropdown</sj-dropdown
  >
  <sj-tooltip
    ref="tooltipRef"
    placement="right-end"
    trigger="contextmenu"
    :popper-options="{ placement: 'right-end', strategy: 'fixed' }"
  >
    <sj-button icon="arrow-up">tooltip</sj-button>
    <template #content> 弹出部分 </template>
  </sj-tooltip>

  <sj-alert title="title" type="success" show-icon />
  <sj-alert title="title" description="description" type="warning" show-icon />
  <sj-alert title="title" description="description" type="danger" show-icon />
  <sj-alert title="title" description="description" type="info" show-icon />

  
</template>
