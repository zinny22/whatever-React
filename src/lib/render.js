import diff from "./diff";
import mount from "./mount";
import { resetIndex } from "./useState";

let prevVNode = null;
let rootDom = null;
let rootContainer = null;

function render(vdom, container) {
  if (!prevVNode) {
    const el = mount(vdom); // ✅ mount 결과 저장
    rootDom = el; // ✅ diff 기준 노드로 지정
    container.appendChild(el);
    rootContainer = container;
  } else {
    diff(prevVNode, vdom, rootDom); // ✅ 반드시 rootDom 기준으로 비교
  }

  prevVNode = vdom;
}

export function rerender(vdom) {
  resetIndex();
  if (rootContainer && rootDom) {
    diff(prevVNode, vdom, rootDom); // ✅ rootDom을 기준으로 비교
    prevVNode = vdom;
  }
}

export default render;
