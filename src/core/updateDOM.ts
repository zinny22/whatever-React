import App from "../components/App";
import { resetIndex } from "../hooks/useState";
import diff from "./diff";
import render, { VNode } from "./render";

let prevVdom: VNode | null = null;
let _container: HTMLElement | null = null;

/**
 * DOM 업데이트 조건
 */
function updateDOM(newVdom: VNode, container: HTMLElement) {
  if (prevVdom === null) {
    render(newVdom, container);
    // 최초 렌더는 container의 첫번째 자식을 _container로 설정
    // (container가 기본적으로 최상위 div에 되어있어서)
    _container = container.children[0] as HTMLElement;
  } else {
    // rerender에서 사용할 diff
    diff(prevVdom, newVdom, container);
  }

  prevVdom = newVdom;
}

export default updateDOM;

/**
 * 상태가 업데이트 될때 호출 (화면 재 렌더링)
 */
export function rerender() {
  if (_container !== null && prevVdom !== null) {
    resetIndex();
    const newVDOM = App();
    updateDOM(newVDOM, _container);
  }
}
