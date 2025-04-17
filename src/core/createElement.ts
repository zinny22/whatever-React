type FunctionComponent<P = {}> = (props: P) => any;

function createElement<P>(
  type: string | FunctionComponent<P>,
  props: any | null,
  ...children: any[]
) {
  return {
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children,
    },
  };
}

export default createElement;
