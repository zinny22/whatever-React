type FunctionComponent<P = {}> = (props: P) => any;

function createElement<P>(
  type: string | FunctionComponent<P>,
  props: any | null,
  ...children: any[]
) {
  const { key, ref, ...restProps } = props || {};

  return {
    type,
    key: key ?? null,
    ref: ref ?? null,
    props: {
      ...restProps,
      children: children.length === 1 ? children[0] : children,
    },
  };
}

export default createElement;
