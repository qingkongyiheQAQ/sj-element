<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <sj-tooltip
        class="box-item"
        content="Top Left prompts info"
        placement="top-start"
      >
        <sj-button>top-start</sj-button>
      </sj-tooltip>
      <sj-tooltip
        class="box-item"
        content="Top Center prompts info"
        placement="top"
      >
        <sj-button>top</sj-button>
      </sj-tooltip>
      <sj-tooltip
        class="box-item"
        content="Top Right prompts info"
        placement="top-end"
      >
        <sj-button>top-end</sj-button>
      </sj-tooltip>
    </div>
    <div class="row">
      <sj-tooltip
        class="box-item"
        content="Left Top prompts info"
        placement="left-start"
      >
        <sj-button>left-start</sj-button>
      </sj-tooltip>
      <sj-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <sj-button>right-start</sj-button>
      </sj-tooltip>
    </div>
    <div class="row">
      <sj-tooltip
        class="box-item"
        content="Left Center prompts info"
        placement="left"
      >
        <sj-button class="mt-3 mb-3">left</sj-button>
      </sj-tooltip>
      <sj-tooltip
        class="box-item"
        content="Right Center prompts info"
        placement="right"
      >
        <sj-button>right</sj-button>
      </sj-tooltip>
    </div>
    <div class="row">
      <sj-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <sj-button>left-end</sj-button>
      </sj-tooltip>
      <sj-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <sj-button>right-end</sj-button>
      </sj-tooltip>
    </div>
    <div class="row center">
      <sj-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <sj-button>bottom-start</sj-button>
      </sj-tooltip>
      <sj-tooltip
        class="box-item"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <sj-button>bottom</sj-button>
      </sj-tooltip>
      <sj-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <sj-button>bottom-end</sj-button>
      </sj-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
