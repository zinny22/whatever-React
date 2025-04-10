import createElement from "../lib/createElement";
import useState from "../lib/useState";
import TodoItem from "./TodoItem";
import Progress from "./Progress";
import { globalState } from "../lib/golbalState";

function TodoList() {
  let inputEl;
  const [todos, setTodos] = useState([]);
  const completedTodos = globalState.completedTodos;

  const onChangeRef = (e) => (inputEl = e);

  const onClickAdd = () => {
    const text = inputEl.value;

    if (text.trim()) {
      setTodos([...todos, text]);
      onClearInput();
    }
  };

  const onClickDelete = (idx) => {
    const filtered = todos.filter((item, index) => index !== idx);
    setTodos([...filtered]);
  };

  const onClearInput = () => (inputEl.value = "");

  return (
    <div>
      <div class="todo">
        <input
          class="todo-input"
          ref={onChangeRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickAdd();
            }
          }}
          placeholder="할 일을 입력하세요"
        />
        <button class="todo-add-button" onClick={onClickAdd}>
          추가
        </button>
      </div>

      <Progress total={todos?.length} completed={completedTodos?.length} />

      <ul>
        {!todos?.length ? (
          <p class="todo-empty-text">작성한 할일이 없습니다.</p>
        ) : (
          todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onClickDelete={() => onClickDelete(index)}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
