import createElement from "../core/createElement";
import useState from "../hooks/useState";
import Title from "./Title";

function App() {
  let value = "";
  const [list, setList] = useState(["일번"]);

  const onClickAdd = () => {
    if (value === "") {
      alert("할 일을 입력해주세요");
      return;
    }

    setList([...list, value]);
    value = "";
  };

  return (
    <div className="list">
      <Title />

      <input
        type="text"
        value={value}
        onChange={(e: any) => {
          const newValue = e.target.value;
          value = newValue;
        }}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={onClickAdd}>추가</button>

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
