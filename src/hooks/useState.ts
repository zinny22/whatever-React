import reRender from "../core/reRender";

const stateStore = {
  state: [] as any[],
  currentIndex: 0,
};

function useState<T>(initialState: T) {
  const index = stateStore.currentIndex;

  if (stateStore.state[index] === undefined) {
    stateStore.state[index] = initialState;
  }

  const setState = (value: T) => {
    stateStore.state[index] = value;
    reRender();
  };

  stateStore.currentIndex++;
  return [stateStore.state[index], setState] as [T, (state: T) => void];
}

export default useState;

export const resetIndex = () => {
  stateStore.currentIndex = 0;
};
