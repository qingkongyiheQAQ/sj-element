import type { Meta, StoryObj } from "@storybook/vue3";
import { SjCollapse, SjCollapseItem } from "sj-element";
import 'sj-element/dist/theme/Collapse.css'

type Story = StoryObj<typeof SjCollapse>;

const meta: Meta<typeof SjCollapse> = {
  title: "Example/Collapse",
  component: SjCollapse,
  subcomponents: { SjCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      SjCollapse,
      SjCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <sj-collapse v-bind="args">
      <sj-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </sj-collapse-item>
      <sj-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </sj-collapse-item>
      <sj-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </sj-collapse-item>
    </sj-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;