/**
 * createElement 함수 -> vdom 생성해 주는 함수
 * @param {string} type - DOM 태그 이름
 * @param {Object} props - props
 * @param {...*} children - 자식 요소
 * @returns {Object} - VNode
 */
function createElement(type, props, ...children) {
  // children이 undefined인 경우를 처리
  const filteredChildren = !children
    ? []
    : children.filter(
        (child) => child !== undefined && child !== null && child !== false
      );

  // props와 children이 모두 없으면 props 생략
  if (!props && filteredChildren.length === 0) {
    return { type };
  }

  return {
    // 타입에 대한 처리는 렌더함수에서 진행
    type,
    props: {
      ...(props || {}),
      children:
        // 1개 일때는 그 자체로, 2개 이상부터 배열의 형식으로 들어가야 함
        filteredChildren.length === 1 ? filteredChildren[0] : filteredChildren,
    },
  };
}

export default createElement;
