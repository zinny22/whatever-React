import App from "./components/App";
import createElement from "./core/createElement";
import render from "./core/render";
import { resetIndex } from "./hooks/useState";

const root: any = document.getElementById("app");
root.innerHTML = "";
resetIndex();
render(App(), root);
