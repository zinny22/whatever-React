/**
 * render함수, createElement에서 생성된 VNode를 실제 DOM으로 변환
 * @param {Object} vdom VNode
 * @param {Element} container DOM 요소
 * @returns void
 */
function render(vdom, container) {
  // 1. 문자열 처리 (텍스트 노드)
  if (typeof vdom === "string") {
    const textNode = document.createTextNode(vdom);
    container.appendChild(textNode);
    return;
  }

  // 2. 함수형 컴포넌트 처리
  if (typeof vdom.type === "function") {
    const componentVNode = vdom.type(vdom.props);
    render(componentVNode, container);
    return;
  }

  // 3. 일반 DOM 태그 생성
  const el = document.createElement(vdom.type);

  // 4. props 처리 (children 제외)
  const { children, ...restProps } = vdom.props || {};
  for (const key in restProps) {
    el.setAttribute(key, restProps[key]);
  }

  // 5. children 재귀 렌더링
  if (Array.isArray(children)) {
    children.forEach((child) => render(child, el));
  } else if (children !== undefined && children !== null) {
    render(children, el);
  }

  // 6. 완성된 요소를 container에 붙이기
  container.appendChild(el);
}

export default render;
