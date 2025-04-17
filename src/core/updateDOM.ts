import App from "../components/App";
import { resetIndex } from "../hooks/useState";
import diff from "./diff";
import render, { VNode } from "./render";

let prevVdom: VNode | null = null;
let _container: HTMLElement | null = null;

/**
 * prevVdom이 null이면 최초 렌더
 * prevVdom이 null이 아니면 diff로 최소 갱신
 */
function updateDOM(newVdom: VNode, container: HTMLElement) {
  if (prevVdom === null) {
    // 최초 렌더는 기존 render 사용
    render(newVdom, container);
  } else {
    // 이후는 diff로 최소 갱신
    diff(prevVdom, newVdom, container);
  }

  prevVdom = newVdom;
  _container = container;
}

export default updateDOM;

/**
 * 상태가 업데이트 될때 호출 (화면 재 렌더링)
 */
export function rerender() {
  // container가 있으면 diff로 가도록
  if (_container !== null && prevVdom !== null) {
    // 렌더링 전에 useState 인덱스 초기화
    resetIndex();
    updateDOM(App(), _container);
  } else {
    console.warn("Container not mounted yet.");
  }
}
