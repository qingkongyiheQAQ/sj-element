import type { StoryObj, Meta } from "@storybook/vue3";

import { fn } from "@storybook/test";
import { SjTooltip } from "sj-element";
import 'sj-element/dist/theme/Tooltip.css'

type Story = StoryObj<typeof SjTooltip>;

const meta: Meta<typeof SjTooltip> = {
  title: "Example/Tooltip",
  component: SjTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args) => ({
    components: { SjTooltip },
    setup() {
      return {
        args,
      };
    },
    template: `
      <SjTooltip v-bind="args">
          <div style="height:30px;width:200px;background:red;padding:auto">trigger</div>
      </SjTooltip>
    `,
  }),
};

export default meta;
