import type { StoryObj, Meta, ArgTypes } from "@storybook/vue3";
import { ref, watch } from "vue";
import { fn } from "@storybook/test";
import { SjAlert, type AlertInstance } from "sj-element";
import "sj-element/dist/theme/Alert.css";

type Story = StoryObj<typeof SjAlert> & { argTypes?: ArgTypes };

const meta: Meta<typeof SjAlert> = {
  title: "Example/Alert",
  component: SjAlert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "info", "danger"],
    },
    effect: {
      control: "select",
      options: ["light", "dark"],
    },
    center: {
      control: "boolean",
    },
 },
  args: {
    onClose: fn(),
  },
};

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: "标题",
    description: "这是一段描述",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    visible: true,//新定义的
  },
  render: (args) => ({
    components: { SjAlert },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open();
          } else {
            alertRef.value?.close();
          }
        }
      );
      return { args, alertRef };
    },
    template: `
     <sj-alert ref="alertRef" v-bind="args"></-alert>
    `,
  }),
};

export default meta;
