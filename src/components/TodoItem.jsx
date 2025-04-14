import createElement from "../lib/createElement";
import useState from "../lib/useState";

function TodoItem({ todo, onClickDelete }) {
  const [isComplete, setIsComplete] = useState(false);

  const onClickComplete = () => {
    setIsComplete(!isComplete);
  };

  return (
    <li id="todo-item">
      <button class="todo-item-button" onClick={onClickComplete}>
        {isComplete ? "취소" : "완료"}
      </button>

      <p class={isComplete ? "todo-item-text-complete" : "todo-item-text"}>
        {todo}
      </p>

      <button class="todo-item-button" onClick={onClickDelete}>
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
