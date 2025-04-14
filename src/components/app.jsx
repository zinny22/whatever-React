import createElement from "../lib/createElement";
import TodoList from "./TodoList";
import Header from "./header";
import useState from "../lib/useState";

export default function App() {
  const [count, setCount] = useState(1);
  return (
    <div class="container">
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* <Header />
      <TodoList /> */}
    </div>
  );
}
