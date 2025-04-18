import App from "./components/App";
import createElement from "./core/createElement";
import updateDOM from "./core/updateDOM";

const root: any = document.getElementById("app");
const appVNode = App();

updateDOM(appVNode, root);
