import createElement from "../core/createElement";
import useState from "../hooks/useState";

function App() {
  const [count, setCount] = useState(1);
  console.log("count", count);

  return (
    <div>
      <h1 style={{ color: "red" }}>카운터</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <p>{count}</p>
    </div>
  );
}

export default App;
