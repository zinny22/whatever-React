import App from "../components/App";
import { resetIndex } from "../hooks/useState";
import render from "./render";

function rerender() {
  resetIndex();
  const container = document.getElementById("app")!;
  container.innerHTML = "";
  render(App(), container);
}

export default rerender;
