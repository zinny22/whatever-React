import { main } from "../main";

/**
 * 전역 상태 저장소 역할
 * states: 모든 컴포넌트의 상태값 저장
 * currentIndex: 현재 실행중인 useState가 몇번째인지
 */
let states = [];
export let currentIndex = 0;

export default function useState(initialValue) {
  const index = currentIndex;

  // 값이 저장되어 있지 않으면, 초기값
  // useState는 호출 순서대로 상태를 저장함
  if (states[index] === undefined) {
    states[index] = initialValue;
  }

  const setState = (newValue) => {
    states[index] = newValue;
    // 상태 변경 후 앱 전체 렌더링 진행
    main();
  };

  //  다음 useState 인덱스 +1
  currentIndex++;
  return [states[index], setState];
}

// 렌더링 시작 전 인덱스를 리셋
export function resetIndex() {
  currentIndex = 0;
}
