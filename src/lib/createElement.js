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
