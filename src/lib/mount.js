/**
 * createElement에서 생성된 VDOM을 최종 DOM으로 return
 * @param {Object} vdom VNode
 * @returns {Element} DOM 요소
 */
function mount(vdom) {
  // 1. 텍스트 노드 처리
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(String(vdom));
  }

  // 2. 함수형 컴포넌트 처리
  if (typeof vdom.type === "function") {
    const componentVNode = vdom.type(vdom.props || {});
    return mount(componentVNode);
  }

  // 3. 일반 DOM 요소 생성
  const el = document.createElement(vdom.type);

  // 4. props 처리 (children 제외)
  const { children, ...restProps } = vdom.props || {};
  for (const key in restProps) {
    if (key === "ref" && typeof restProps[key] === "function") {
      restProps[key](el);
    } else if (key.startsWith("on")) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, restProps[key]);
    } else if (key === "className") {
      el.setAttribute("class", restProps[key]);
    } else if (key === "style" && typeof restProps[key] === "object") {
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

  // 5. children 처리
  const childrenArray = [].concat(children || []);
  childrenArray.forEach((child) => {
    const childEl = mount(child);
    el.appendChild(childEl);
  });

  // 6. 완성된 DOM 요소 반환
  return el;
}

export default mount;
