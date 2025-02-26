import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@sj-element/utils";

console.log('Collapse:11sujing', Collapse);
console.log('CollapseItem.vue 导入:', CollapseItem);

const CollapseComponent = withInstall(Collapse);
console.log('withInstall 返回结果:', CollapseComponent);  // 新增日志
const CollapseItemComponent = withInstall(CollapseItem);
console.log('withInstall(CollapseItem) aaaaaaa返回:', CollapseItemComponent);

export const SjCollapse = CollapseComponent;
export const SjCollapseItem = CollapseItemComponent;
export * from './types'