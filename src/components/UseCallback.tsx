import React, { useState, useCallback, useEffect, memo } from 'react';

type Props = {
  id: string;
  onClick: () => void;
  count: number;
};

// コンポーネントで`memo()`（`React.memo`）でラップすることで、
// レンダリング結果をメモする。そして次のレンダリング時、新しいレンダリング結果が
// 前回のレンダリング結果と同じかどうかチェックし、同じであれば前回のレンダリング結果を利用する
// そのため、Props などが変更されない限り、メモ化されたレンダリング結果が利用される
const CountButton: React.FC<Props> = memo(({ id, onClick, count }) => {
  useEffect(() => {
    console.log(`render ${id}`);
  });
  return <button onClick={onClick}>{count}</button>;
});

const UseCallback = () => {
  const [count1, setCount1] = useState(0);
  // `useCallback()`でラップすることにより、
  // 関数自体の依存が変わらない限り、キャッシュされた関数を返す
  // 今回の関数は`() => setCount1(count1 + 1)`なので、依存しているものは`count1`になる
  // そのため、第２引数に指定している配列（`[count1]`）の値が変わらない限り、キャッシュされた関数を返す
  const increment1 = useCallback(
    // スコープ外の変数`count1`に依存している
    () => setCount1(count1 + 1),
    // スコープ外の変数`count1`に依存しているので、`[count1]`を指定する
    [count1]
  );
  // ↑ではなく、以下を定義した場合、関数（`() => setCount1(c => c + 1)`）はメモ化されないため
  // このコンポーネントが依存していない`count2`だけが更新されても、このコンポーネントも再描画される。
  // const increment1 = () => setCount1(c => c + 1);

  const [count2, setCount2] = useState(0);
  const increment2 = useCallback(
    // setState 関数形式での更新 https://ja.reactjs.org/docs/hooks-reference.html#functional-updates
    // `count2`などのスコープ外の変数に依存していない
    () => setCount2(count => count + 1),
    // スコープ外の変数に依存していないため、`[]`でOK。
    []
  );
  // ↑ではなく、以下を定義した場合、関数（`() => setCount2(c => c + 1)`）はメモ化されないため
  // このコンポーネントが依存していない`count1`だけが更新されても、このコンポーネントも再描画される。
  // const increment2 = () => setCount2(c => c + 1);

  return (
    <div>
      <h2>UseCallback</h2>
      <CountButton id={'CountButton1'} count={count1} onClick={increment1} />
      <CountButton id={'CountButton2'} count={count2} onClick={increment2} />
    </div>
  );
};

export default UseCallback;
