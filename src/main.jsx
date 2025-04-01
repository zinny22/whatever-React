import createElement from "./lib/createElement";
import render from "./lib/render";
import Header from "./components/header";
import Content from "./components/content";

const vdom = (
  <div id="app">
    <Header />
    <Content />
    <p>결과는 제대로 나오는걸까?</p>
  </div>
);

console.log("Virtual DOM:", JSON.stringify(vdom, null, 2));
render(vdom, document.getElementById("app"));
