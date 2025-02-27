import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@sj-element/utils";

const CollapseComponent = withInstall(Collapse);
const CollapseItemComponent = withInstall(CollapseItem);

export const SjCollapse = CollapseComponent; 
export const SjCollapseItem = CollapseItemComponent;

export * from './types' 