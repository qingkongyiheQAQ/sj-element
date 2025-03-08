import { describe, test, expect } from "vitest";
import { nextTick } from "vue";
import { message, closeAll } from "./methods";

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};

// function getTopValue(element: Element) {
//   const styles = window.getComputedStyle(element);
//   const topValue = styles.getPropertyValue("top");
//   return Number.parseFloat(topValue);
// }

describe("Message", () => {
  test("message() function", async () => {
    const handler = message({ message: "hello msg first try", duration: 0 });
    await rAF();
    expect(document.querySelector(".sj-message")).toBeTruthy();
    handler.close();
    await nextTick();
    await rAF();
  
    expect(document.querySelector(".sj-message")).toBeFalsy();
  });

  test("call message() function more than once", async () => {
    message({ message: "hello msg", duration: 0 });
    message({ message: "hello msg1", duration: 0 });
    await rAF();
    expect(document.querySelectorAll(".sj-message").length).toBe(2);
    closeAll();
    await rAF();
    expect(document.querySelector(".sj-message")).toBeFalsy();
    console.log(document.body.innerHTML, '这里应该没有 .sj-message2');
  });

});
