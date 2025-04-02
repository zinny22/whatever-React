import createElement from "../lib/createElement";
import useState from "../lib/useState";

export default function Content() {
  const [count, setCount] = useState(6);

  return (
    <div>
      <p>카운터: {count}???</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
