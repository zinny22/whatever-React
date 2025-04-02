import "./styles/normalize.css";
import "./styles/todo.css";
import createElement from "./lib/createElement";
import render from "./lib/render";
import App from "./components/App";
import { resetIndex } from "./lib/useState";

export function main() {
  resetIndex();
  const root = document.getElementById("app");
  root.innerHTML = "";
  render(App(), root);
}

// 앱 처음 실행
main();
