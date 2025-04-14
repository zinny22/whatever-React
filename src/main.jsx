import "./styles/normalize.css";
import "./styles/todo.css";
import createElement from "./lib/createElement";
import render from "./lib/render";
import App from "./components/App";
import { resetIndex } from "./lib/useState";

resetIndex();
render(<App />, document.getElementById("app"));
