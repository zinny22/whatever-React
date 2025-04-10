import createElement from "../lib/createElement";
import TodoList from "./TodoList";
import Header from "./header";

export default function App() {
  return (
    <div class="container">
      <Header />
      <TodoList />
    </div>
  );
}
