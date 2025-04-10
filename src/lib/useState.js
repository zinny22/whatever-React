import { main } from "../main";

/**
 * 헷갈렸던 부분 1 const로 선언한 객체에 직접 할당은 불가능 한줄..
 * but const로 선언한 객체는 참조값 변경이 불가능한 거지, 객체 안의 속성 값은 바꿀 수 있음
 */
const state = { states: [], currentIndex: 0 };

/**
 * 전역 상태 저장소 역할
 * states: 모든 컴포넌트의 상태값 저장
 * currentIndex: 현재 실행중인 useState가 몇번째인지
 */
export default function useState(initialValue) {
  const index = state.currentIndex;

  // 값이 저장되어 있지 않으면, 초기값
  // useState는 호출 순서대로 상태를 저장함
  if (state.states[index] === undefined) {
    state.states[index] = initialValue;
  }

  const setState = (newValue) => {
    state.states[index] = newValue;
    // 상태 변경 후 앱 전체 렌더링 진행
    main();
  };

  //  다음 useState 인덱스 +1
  state.currentIndex++;
  return [state.states[index], setState];
}

// 렌더링 시작 전 인덱스를 리셋
export function resetIndex() {
  state.currentIndex = 0;
}
