/**
 * createElement 함수
 * @param {string} type - DOM 태그 이름
 * @param {Object} props - props
 * @param {...*} children - 자식 요소
 * @returns {Object} - VNode
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...(props || {}),
      children:
        children.length === 0
          ? undefined
          : children.length === 1
          ? children[0]
          : children,
    },
  };
}

export default createElement;
