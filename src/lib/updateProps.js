function updateProps(dom, prevProps, nextProps) {
  // 1. 새로운 props를 추가하거나 변경된 값을 적용
  for (const key in nextProps) {
    if (key === "children") continue;

    if (prevProps[key] !== nextProps[key]) {
      if (key === "ref" && typeof nextProps[key] === "function") {
        nextProps[key](dom);
      } else if (key.startsWith("on")) {
        const event = key.slice(2).toLowerCase();
        if (prevProps[key]) {
          dom.removeEventListener(event, prevProps[key]);
        }
        dom.addEventListener(event, nextProps[key]);
      } else if (key === "className") {
        dom.setAttribute("class", nextProps[key]);
      } else if (key === "style" && typeof nextProps[key] === "object") {
        // style을 객체로 처리한 경우
        const styleStr = Object.entries(nextProps[key])
          .map(
            ([prop, value]) =>
              `${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${value}`
          )
          .join(";");
        dom.setAttribute("style", styleStr);
      } else {
        dom.setAttribute(key, nextProps[key]);
      }
    }
  }

  // 2. 이전에는 있었지만, 지금은 없는 props 제거
  for (const key in prevProps) {
    if (key === "children") continue;
    if (!(key in nextProps)) {
      if (key.startsWith("on")) {
        const event = key.slice(2).toLowerCase();
        dom.removeEventListener(event, prevProps[key]);
      } else {
        dom.removeAttribute(key);
      }
    }
  }
}

export default updateProps;
