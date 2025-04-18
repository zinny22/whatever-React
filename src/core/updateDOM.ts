import { resetIndex } from "../hooks/useState";
import App from "../components/App";
import { flushEffects } from "../hooks/useEffect";
import render, { VNode } from "./render";
import diff from "./diff";

let prevVNode: VNode | null = null;
let _container: HTMLElement | null = null;

export default function updateDOM(newVdom: VNode, container: HTMLElement) {
  container.innerHTML = ""; // 1. 초기화

  resetIndex();
  render(newVdom, container); // 2. 실제 DOM 삽입

  _container = container.firstElementChild as HTMLElement;
  prevVNode = newVdom;

  flushEffects();
}

export function rerender() {
  if (_container !== null && prevVNode !== null) {
    resetIndex();

    const newVNode = App();
    diff(prevVNode, newVNode, _container);

    flushEffects();
    prevVNode = newVNode; // 🔁 마지막에 업데이트
  }
}
