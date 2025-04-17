import { VNode } from "./render";

function diff(prevVdom: VNode, newVdom: VNode, container: HTMLElement) {
  console.log("diff:", prevVdom, newVdom);
  return { prevVdom, newVdom };
}

export default diff;
