export type VNode = {
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
      .forEach((name, i) => {
        if (name === "onClick") {
          // ✅ 이벤트 핸들러: JSX의 onClick → 실제 click 이벤트로 바인딩
          domElement.addEventListener("click", vdom.props[name]);
        } else if (name === "style") {
          // ✅ style 객체 적용: { color: "red" } → element.style.color = "red"
          Object.assign(domElement.style, vdom.props[name]);
        } else if (name === "className") {
          // ✅ className은 JS에서는 프로퍼티, HTML에서는 "class" 속성
          domElement.className = vdom.props[name];
        } else if (name === "htmlFor") {
          // ✅ JSX의 htmlFor → HTML의 "for" 속성으로 변환
          domElement.setAttribute("for", vdom.props[name]);
        } else if (name === "dangerouslySetInnerHTML") {
          // ⚠️ HTML 문자열 직접 삽입 (보안 위험 있을 수 있음)
          // ✅ children과 함께 사용하면 안 됨 (경고 출력)
          if (vdom.props[name].__html) {
            console.warn(
              "dangerouslySetInnerHTML와 children은 동시에 사용할 수 없습니다."
            );
          }
          domElement.innerHTML = vdom.props[name].__html;
        } else if (
          typeof vdom.props[name] === "boolean" &&
          ["disabled", "checked", "readonly", "autofocus", "required"].includes(
            name
          )
        ) {
          // ✅ 불린 속성: true면 속성 추가, false면 제거
          if (vdom.props[name]) {
            domElement.setAttribute(name, "");
            (domElement as any)[name] = true;
          } else {
            domElement.removeAttribute(name);
            (domElement as any)[name] = false;
          }
        } else {
          // ✅ 그 외 속성은 대부분 DOM 프로퍼티로 처리 (ex: id, title, etc.)
          (domElement as any)[name] = vdom.props[name];
        }
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

  // ref 처리
  if (vdom.ref) {
    if (typeof vdom.ref === "function") {
      vdom.ref(domElement);
    } else if (typeof vdom.ref === "object" && vdom.ref !== null) {
      vdom.ref.current = domElement;
    }
  }

  // 생성된 DOM 노드를 부모 노드에 추가
  container.appendChild(domElement);
}

export default render;
