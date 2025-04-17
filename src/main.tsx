import App from "./components/App";
import createElement from "./core/createElement";
import updateDOM from "./core/updateDOM";
import { resetIndex } from "./hooks/useState";

const root: any = document.getElementById("app");
root.innerHTML = "";
resetIndex();
updateDOM(App(), root);
