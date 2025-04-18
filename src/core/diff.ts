import render, { VNode } from "./render";

function diff(oldVdom: VNode, newVdom: VNode, container: HTMLElement) {
  // 타입이 다르면 전체 교체
  if (oldVdom.type !== newVdom.type) {
    console.log("[타입이 다르면 전체 교체]", oldVdom, newVdom);
    const newDom = render(newVdom);
    const oldDom = render(oldVdom);
    container.replaceChild(newDom, oldDom);
    return;
  }

  // 텍스트 노드
  if (typeof newVdom === "string" || typeof newVdom === "number") {
    if (oldVdom !== newVdom) {
      const textNode = document.createTextNode(newVdom);

      if (container.parentNode) {
        container.parentNode.replaceChild(textNode, container);
      }
    }
  }

  // 컴포넌트일 경우 재귀적으로 diff
  if (
    typeof oldVdom.type === "function" &&
    typeof newVdom.type === "function"
  ) {
    const prevRendered = oldVdom.type(oldVdom.props);
    const newRendered = newVdom.type(newVdom.props);

    return diff(prevRendered, newRendered, container);
  }

  // props 비교
  const oldProps = oldVdom.props || {};
  const newProps = newVdom.props || {};

  // 기존 속성과 현재 속성 비교
  Object.keys(newProps)
    .filter((key) => key !== "children")
    .forEach((name) => {
      // props가 변경된 경우만 처리 하면 됨
      if (oldProps[name] !== newProps[name]) {
        if (name.startsWith("on")) {
          container.addEventListener(
            name.slice(2).toLowerCase(),
            newProps[name]
          );
        } else if (name === "style") {
          Object.assign(container.style, newProps[name]);
        } else if (name === "className") {
          container.className = newProps[name];
        } else if (name === "htmlFor") {
          container.setAttribute("for", newProps[name]);
        } else if (name === "dangerouslySetInnerHTML") {
          if (newProps[name].__html) {
            container.innerHTML = newProps[name].__html;
          }
        } else if (
          typeof newProps[name] === "boolean" &&
          ["disabled", "checked", "readonly", "autofocus", "required"].includes(
            name
          )
        ) {
          if (newProps[name]) {
            container.setAttribute(name, "");
            (container as any)[name] = true;
          } else {
            container.removeAttribute(name);
            (container as any)[name] = false;
          }
        } else {
          container.setAttribute(name, newProps[name]);
        }
      }
    });

  //기존에는 있었는데 새로운 VDOM에는 없는 속성 제거
  Object.keys(oldProps)
    .filter((key) => key !== "children")
    .forEach((name) => {
      if (newProps[name] === undefined || newProps[name] === null) {
        if (name === "onClick") {
          container.removeEventListener("click", oldProps[name]);
        } else {
          container.removeAttribute(name);
        }
      }
    });

  // children 정규화
  const normalizeChildren = (children: any) => {
    if (!children) return [];
    return (Array.isArray(children) ? children : [children]).filter(Boolean);
  };

  const oldChildren = normalizeChildren(oldProps.children);
  const newChildren = normalizeChildren(newProps.children);

  // 현재 DOM 노드들의 배열
  const domNodes = Array.from(container?.childNodes || []);

  // 새로운 children 순회하면서 업데이트
  newChildren.forEach((newChild, i) => {
    const oldChild = oldChildren[i];
    const existingNode = domNodes[i];

    if (!oldChild) {
      // 새로운 노드 추가
      const newEl = render(newChild as VNode);
      container.appendChild(newEl);
    } else if (
      typeof oldChild !== typeof newChild ||
      (oldChild as VNode).type !== (newChild as VNode).type
    ) {
      // 타입이 다르면 교체
      const newEl = render(newChild as VNode);
      if (existingNode) {
        container.replaceChild(newEl, existingNode);
      } else {
        container.appendChild(newEl);
      }
    } else {
      // 타입이 같으면 재귀적으로 diff
      diff(oldChild as VNode, newChild as VNode, existingNode as HTMLElement);
    }
  });

  // 사용되지 않는 이전 노드들 제거
  for (let i = oldChildren.length - 1; i >= 0; i--) {
    if (!newChildren[i]) {
      const nodeToRemove = domNodes[i];
      if (nodeToRemove && nodeToRemove.parentNode === container) {
        container.removeChild(nodeToRemove);
      }
    }
  }
}

export default diff;
