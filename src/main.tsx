import App from "./components/App";
import createElement from "./core/createElement";

const main = () => (
  <div id="app" className="app">
    <h1 key="main-title">메인 타이틀</h1>
    <li key="child1">자식의1</li>
    <li key="child2">자식의2</li>
    <div id="child" className="child" ref="null">
      <span id="child2" className="child2">
        자식의2
      </span>
    </div>
    <App />
  </div>
);

console.log("stringify:", JSON.stringify(main(), null, 2));
console.log("main:", main());
