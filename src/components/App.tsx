import createElement from "../core/createElement";

function App() {
  return (
    <div>
      <h1 style={{ color: "red" }}>카운터</h1>
      <button onClick={() => console.log(12)}>증가</button>
    </div>
  );
}

export default App;
