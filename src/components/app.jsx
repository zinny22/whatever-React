import createElement from "../lib/createElement";
import Header from "./Header";
import Content from "./Content";

export default function App() {
  return (
    <div id="app">
      <Header />
      <Content />
      <p>결과는 제대로 나오는걸까?</p>
    </div>
  );
}
