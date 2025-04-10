import createElement from "./createElement";
import Header from "./header";
import Content from "./content";
var vdom = createElement("div", null, createElement(Header, null), createElement(Content, null), createElement("p", null, "\uACB0\uACFC\uB294 \uC81C\uB300\uB85C \uB098\uC624\uB294\uAC78\uAE4C?"));
console.log("Virtual DOM:", JSON.stringify(vdom, null, 2));