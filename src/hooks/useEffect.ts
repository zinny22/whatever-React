const effects: { callback: () => void; deps: any[]; hasChanged: boolean }[] =
  [];
let currentEffectIndex = 0;

function areDepsEqual(prevDeps: any[], nextDeps: any[]) {
  if (prevDeps.length === 1 && prevDeps[0] === "") {
    console.log("prevDeps", prevDeps);
    return true;
  }

  if (prevDeps.length !== nextDeps.length) return false;
  return prevDeps.every((dep, index) => dep === nextDeps[index]);
}

function useEffect(callback: () => void, deps?: any[]) {
  console.log("deps", deps);
  const prev = effects[currentEffectIndex];

  const hasChanged = !prev || !areDepsEqual(prev.deps, deps || []);
  console.log("hasChanged", hasChanged, currentEffectIndex, effects);

  if (hasChanged) {
    // deps가 바뀌었으니 실행할 callback 저장
    effects[currentEffectIndex] = {
      callback,
      deps: deps || [],
      hasChanged: true,
    };
  } else {
    // deps가 안 바뀐 경우 실행 안 함
    effects[currentEffectIndex] = { ...prev, hasChanged: false };
  }

  currentEffectIndex++;
}

export default useEffect;

export function flushEffects() {
  effects.forEach((effect) => {
    if (effect.hasChanged) {
      effect.callback();
    }
  });
  currentEffectIndex = 0;
}
