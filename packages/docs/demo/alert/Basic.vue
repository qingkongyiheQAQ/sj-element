<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <sj-alert type="success">Success alert</sj-alert>
    <sj-alert type="info">Info alert</sj-alert>
    <sj-alert type="warning">Warning alert</sj-alert>
    <sj-alert type="danger">Error alert</sj-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <sj-alert type="success" title="Success alert" />
    <sj-alert type="info" title="Info alert" />
    <sj-alert type="warning" title="Warning alert" />
    <sj-alert type="danger" title="Error alert" />
  </div>
</template>
