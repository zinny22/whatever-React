import "./styles/normalize.css";
import "./styles/todo.css";
import createElement from "./lib/createElement";
import render from "./lib/render";
import App from "./components/App";
import { resetIndex } from "./lib/useState";

resetIndex();
// JSX <App />는 함수 자체를 넘기는 것이고, App()은 VNode를 직접 실행해서 만든 결과를 넘기는 것!
render(App(), document.getElementById("app"));
