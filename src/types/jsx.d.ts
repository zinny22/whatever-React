// src/types/jsx.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    [key: string]: any; // <div />, <p /> 등 다 통과시켜줌
  }
}
