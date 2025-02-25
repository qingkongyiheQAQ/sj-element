import type { Ref } from "vue"

export type CollapseItemName = string | number;

export interface CollapseProps {
  modelValue: CollapseItemName[]; // 绑定当前展开的面板列表
  accordion?: boolean; // 是否开启手风琴模式
}

export interface CollapseItemProps {
  name: CollapseItemName; // 面板唯一标识符
  title?: string; // 面板的标题（可选）
  disabled?: boolean; // 是否禁用
}
export interface CollapseEmits {
  (e: "update:modelValue", value: CollapseItemName[]): void;
  (e: "change", value: CollapseItemName[]): void;
}

export interface CollapseContext {
  activeNames: Ref<CollapseItemName[]>;
  handleItemClick(name: CollapseItemName): void;
}