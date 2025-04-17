import App from "./components/App";
import createElement from "./core/createElement";
import render from "./core/render";

const root: any = document.getElementById("app");
render(App(), root);
