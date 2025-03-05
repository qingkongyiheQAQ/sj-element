import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
  SjAlert,
  SjButton,
  SjButtonGroup,
  SjCollapse,
  SjCollapseItem,
  SjIcon,
  SjTooltip
} from "..";
import { get, map } from "lodash-es";

const comps = [
  SjAlert,
  SjButton,
  SjButtonGroup,
  SjCollapse,
  SjCollapseItem,
  SjIcon,
  SjTooltip
] as Plugin[];

describe("components/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s should be exported",
    (_, component) => {
      expect(component).toBeDefined();
      expect(component.install).toBeDefined();
    }
  );
});
