type VNode = {
  type: string | ((props: any) => VNode);
  props: {
    [key: string]: any;
    children?: VNode | VNode[] | string | number;
  };
  key?: any;
  ref?: any;
};

/**
 * createElement의 결과로 나온 virtual dom을 실제 dom으로 변환하여 브라우저에 렌더링
 * @param vdom createElement의 결과로 나온 virtual dom
 * @param container DOM에 실제 노드를 붙일 부모 element
 * @returns
 */
function render(vdom: VNode, container: HTMLElement) {
  // VDOM이 문자열이나 숫자인 경우 텍스트 노드를 생성
  if (typeof vdom === "string" || typeof vdom === "number") {
    const textNode = document.createTextNode(vdom);
    container.appendChild(textNode);
    return;
  }

  // VDOM의 type이 함수인 경우 컴포넌트로 간주
  if (typeof vdom.type === "function") {
    // 재귀
    const componentVdom = vdom.type(vdom.props);
    render(componentVdom, container);
    return;
  }

  // 일반 DOM노드 생성
  const domElement = document.createElement(vdom.type);

  // props 중 children 제외한 나머지를 DOM에 직접 속성으로 바인딩 (id, className 등)
  if (vdom.props) {
    Object.keys(vdom.props)
      .filter((key) => key !== "children")
      .forEach((name) => {
        (domElement as any)[name] = vdom.props[name];
      });
  }

  // children을 재귀적으로 렌더링
  if (vdom.props.children) {
    // children이 배열이 아닌 경우 배열로 변환
    const children = Array.isArray(vdom.props.children)
      ? vdom.props.children
      : [vdom.props.children];

    children.forEach((child: any) => render(child, domElement));
  }

  // 생성된 DOM 노드를 부모 노드에 추가
  container.appendChild(domElement);
}

export default render;
