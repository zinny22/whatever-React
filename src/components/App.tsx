import createElement from "../core/createElement";
import useState from "../hooks/useState";
import Title from "./Title";

function App() {
  let inputEl: HTMLInputElement | null = null;
  const [list, setList] = useState(["일번"]);
  const onChangeRef = (e: HTMLInputElement) => (inputEl = e);

  return (
    <div className="list">
      <Title />

      <input type="text" ref={onChangeRef} placeholder="할 일을 입력하세요" />
      <button onClick={() => setList([...list, inputEl?.value || ""])}>
        추가
      </button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            {index}
            <button onClick={() => setList(list.filter((_, i) => i !== index))}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
