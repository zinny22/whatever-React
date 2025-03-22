import createElement from "./createElement";
import Header from "./header";
import Content from "./content";

const vdom = (
  <div>
    <Header />
    <Content />
    <p>결과는 제대로 나오는걸까?</p>
  </div>
);

console.log("Virtual DOM:", JSON.stringify(vdom, null, 2));
