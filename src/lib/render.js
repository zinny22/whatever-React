/**
 * render함수, createElement에서 생성된 VNode를 실제 DOM으로 변환
 * @param {Object} vdom VNode
 * @param {Element} container DOM 요소
 * @returns void
 */
function render(vdom, container) {
  // 1. 텍스트 & 숫자 노드 처리
  if (typeof vdom === "string" || typeof vdom === "number") {
    const textNode = document.createTextNode(String(vdom));
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
    if (key === "ref" && typeof restProps[key] === "function") {
      // ref 함수 호출해서 el 전달
      restProps[key](el);
    } else if (key.startsWith("on")) {
      // onClick, onChange, onSubmit 등 이벤트 핸들러
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, restProps[key]);
    } else if (key === "className") {
      // class 속성 처리
      el.setAttribute("class", restProps[key]);
    } else if (key === "htmlFor") {
      // label의 for 속성 처리
      el.setAttribute("for", restProps[key]);
    } else if (key === "style" && typeof restProps[key] === "object") {
      // style 객체를 문자열로 변환
      const styleStr = Object.entries(restProps[key])
        .map(
          ([prop, value]) =>
            `${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${value}`
        )
        .join(";");
      el.setAttribute("style", styleStr);
    } else {
      el.setAttribute(key, restProps[key]);
    }
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
