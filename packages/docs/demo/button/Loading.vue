<template>
  <div>
    <sj-button type="primary" loading>Loading</sj-button>
    <sj-button type="primary" loading-icon="circle-notch" loading
      >Loading</sj-button
    >
    <sj-button type="primary" loading>
      <template #loading>
        <sj-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </sj-button>
  </div>
</template>
