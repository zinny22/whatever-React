import { main } from "../main";

export const globalState = {
  completedTodos: [],
};

export function setGlobalState(key, value) {
  globalState[key] = value;
  main();
}
