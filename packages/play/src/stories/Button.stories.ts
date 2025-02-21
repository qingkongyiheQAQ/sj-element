import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
// fn()：创建一个 模拟函数（mock function），用于测试事件回调（如 onClick）。
import { fn, within, userEvent, expect,clearAllMocks } from "@storybook/test";
import { set } from "lodash-es";

import { SjButton,SjButtonGroup } from "sj-element";
// import 'sj-element/dist/theme/Button.css';

//  
type Story = StoryObj<typeof SjButton> & { argTypes?: ArgTypes };
// 全局配置 定义 SjButton 组件的 Storybook 全局信息（
const meta: Meta<typeof SjButton> = {
  title: "Example/Button",
  component: SjButton,
  tags: ["autodocs"],
  argTypes: {
    // argTypes 决定 Storybook UI 控制面板里有哪些参数可调节
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  // fn() 创建一个 mock 函数，它不会做任何事，但可以 记录是否被调用。
  // 适用于测试和交互记录，当按钮被点击时，Storybook UI 可以显示事件被触发的次数。
  args: { onClick: fn() },
};
// 包裹 Story 中的组件，使其带有 margin: 5px 的外边距。
const container = (val: string) => `
<div style="margin:50px">
  ${val}
</div>
`;
// 所有 Story 默认继承 meta 里的 argTypes
// args 必须包含 content，并且 content 必须是 string。
export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  // args 代表 Story 的默认参数， args 用于传递组件的 props 和事件处理函数
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args) => ({
    // 注册 SjButton 组件，让 template 里可以使用<sj- button >。
    components: { SjButton },
    setup() {
      // template 里可以使用 args
      return { args };
    },
    // 
    template: container(
      `<sj-button data-testid="story-test-btn" v-bind="args">{{args.content}}</sj-button>`
    ),
  }),

  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId("story-test-btn");

    await step(
      "When useThrottle is set to true, the onClick should be called once",
      async () => {
        set(args, "useThrottle", true);
        await userEvent.tripleClick(btn);

        expect(args.onClick).toHaveBeenCalledOnce();
        clearAllMocks();
      }
    );

    await step(
      "When useThrottle is set to false, the onClick should be called three times",
      async () => {
        set(args, "useThrottle", false);
        await userEvent.tripleClick(btn);

        expect(args.onClick).toHaveBeenCalledTimes(3);
        clearAllMocks();
      }
    );

    await step(
      "When disabled is set to true, the onClick should not be called",
      async () => {
        set(args, "disabled", true);
        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, "disabled", false);
        clearAllMocks();
      }
    );

    await step(
      "When loading is set to true, the onClick should not be called",
      async () => {
        set(args, "loading", true);
        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, "loading", false);
        clearAllMocks();
      }
    );
  },
};

export const Autofocus: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    content: "Button",
    autofocus: true,
  },
  render: (args) => ({
    components: { SjButton },
    setup() {
      return { args };
    },
    template: container(
      `
      <p>请点击浏览器的刷新页面来获取按钮聚焦</p>
      <sj-button data-testid="story-test-btn" v-bind="args">{{args.content}}</sj-button>
      `
    ),
  }),
  play: async ({ args }) => {
    await userEvent.keyboard("{enter}");

    expect(args.onClick).toHaveBeenCalledOnce();
    clearAllMocks();
  },
};

//圆形图标
export const Circle: Story = {
  args: {
    icon: "search",
  },
  render: (args) => ({
    components: { SjButton },
    setup() {
      return { args };
    },
    template: container(`
      <sj-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: {
      control: "boolean",
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1",
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2",
    },
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2",
  },
  render: (args) => ({
    components: { SjButton, SjButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <sj-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <sj-button v-bind="args">{{args.content1}}</sj-button>
         <sj-button v-bind="args">{{args.content2}}</sj-button>
       </sj-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    // 定义一个 Storybook 的测试步骤
    await step("click btn1", async () => {
      // 模拟用户点击组件内的 "Button1" 按钮。
      await userEvent.click(canvas.getByText("Button1"));
    });
    // await step("click btn2", async () => {
    //   await userEvent.click(canvas.getByText("Button2"));
    // });
    // 断言 onClick 事件被触发，确保按钮的点击事件被正确调用。 检查 onClick 事件是否被触发，如果 onClick 没有被调用，测试会失败。
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;