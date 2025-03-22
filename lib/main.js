import { createElement } from "./createElement";

// JSX → Babel → createElement(...)로 변환됨
var vdom = createElement("div", null, createElement("h1", null, "Hello"), createElement("p", null, "World"));
console.log("🔍 Virtual DOM 결과:", vdom);