import { rerender } from "../core/updateDOM";

// ✅ 상태 저장소 (useState)
const stateStore = {
  state: [] as any[],
  index: 0,
};

function useState(initialValue?: any) {
  const fixedIndex = stateStore.index;
  stateStore.state[fixedIndex] ??= initialValue;

  const setState = (newValue: any) => {
    if (newValue === stateStore.state[fixedIndex]) return;
    stateStore.state[fixedIndex] = newValue;
    rerender();
  };

  stateStore.index++;
  return [stateStore.state[fixedIndex], setState];
}

export default useState;

export function resetIndex() {
  stateStore.index = 0;
}
