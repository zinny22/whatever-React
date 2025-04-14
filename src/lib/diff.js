import mount from "./mount";
import updateProps from "./updateProps";

function diff(oldVNode, newVNode, dom) {
  const isText = (v) => typeof v === "string" || typeof v === "number";

  // 함수형 컴포넌트 flatten
  if (typeof oldVNode?.type === "function") {
    oldVNode = oldVNode.type(oldVNode.props);
  }
  if (typeof newVNode?.type === "function") {
    newVNode = newVNode.type(newVNode.props);
  }

  // 1. 텍스트 ↔ 텍스트
  if (isText(oldVNode) && isText(newVNode)) {
    if (String(oldVNode) !== String(newVNode)) {
      if (dom.nodeType === Node.TEXT_NODE) {
        dom.nodeValue = String(newVNode);
      } else if (dom.firstChild?.nodeType === Node.TEXT_NODE) {
        dom.firstChild.nodeValue = String(newVNode);
      } else {
        console.warn("텍스트 노드를 찾을 수 없음", dom);
      }
    }
    return;
  }

  // 2. 텍스트 → 엘리먼트
  if (isText(oldVNode) && !isText(newVNode)) {
    const newEl = mount(newVNode);
    if (dom.parentNode) {
      dom.parentNode.replaceChild(newEl, dom);
    } else {
      console.warn("❗ 텍스트 → 엘리먼트 교체 실패: parentNode 없음", dom);
    }
    return;
  }

  // 3. 엘리먼트 → 텍스트
  if (!isText(oldVNode) && isText(newVNode)) {
    const newText = document.createTextNode(String(newVNode));
    if (dom.parentNode) {
      dom.parentNode.replaceChild(newText, dom);
    } else {
      console.warn("❗ 엘리먼트 → 텍스트 교체 실패: parentNode 없음", dom);
    }
    return;
  }
  // 4. 타입이 다르면 교체
  if (oldVNode.type !== newVNode.type) {
    const newEl = mount(newVNode);
    if (dom.parentNode) {
      dom.parentNode.replaceChild(newEl, dom);
    } else {
      console.warn("🔥 교체 실패: parentNode 없음", dom);
    }
    return;
  }

  // 5. props 업데이트
  updateProps(dom, oldVNode.props || {}, newVNode.props || {});

  // 6. children diff
  const oldChildren = [].concat(oldVNode.props?.children || []);
  const newChildren = [].concat(newVNode.props?.children || []);
  const max = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < max; i++) {
    let prev = oldChildren[i];
    let next = newChildren[i];
    const childNode = dom.childNodes[i];

    // 함수형 컴포넌트 flatten
    if (typeof prev?.type === "function") {
      prev = prev.type(prev.props);
    }
    if (typeof next?.type === "function") {
      next = next.type(next.props);
    }

    // 없는 경우 → append
    if (!prev && next) {
      const newEl = mount(next);
      dom.appendChild(newEl);
      continue;
    }

    // 제거된 경우 → remove
    if (prev && !next && childNode) {
      dom.removeChild(childNode);
      continue;
    }

    // 둘 다 있으면 → diff 재귀
    if (prev && next && childNode) {
      diff(prev, next, childNode);
    }
  }
}

export default diff;
