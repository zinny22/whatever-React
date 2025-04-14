import createElement from "../lib/createElement";
import TodoList from "./TodoList";
import Header from "./header";
import useState from "../lib/useState";

export default function App() {
  console.log("🌱 App 실행됨");

  const [count, setCount] = useState(0);

  return (
    <div class="container">
      <Header />
      <p>{count.toString()}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {/* <Header />
      <TodoList /> */}
    </div>
  );
}
