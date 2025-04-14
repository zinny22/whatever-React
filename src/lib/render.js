import App from "../components/App";
import diff from "./diff";
import mount from "./mount";
import { resetIndex } from "./useState";

let prevVNode = null;
let rootDom = null;
let rootContainer = null;

function render(vdom, container) {
  if (!prevVNode) {
    const el = mount(vdom);
    rootDom = el;
    container.appendChild(el);
    rootContainer = container;
  } else {
    diff(prevVNode, vdom, rootDom);
  }

  prevVNode = vdom;
}

export function rerender() {
  if (!rootContainer) return;

  resetIndex();
  const newVNode = App();
  diff(prevVNode, newVNode, rootDom);
  prevVNode = newVNode;
}
export default render;
