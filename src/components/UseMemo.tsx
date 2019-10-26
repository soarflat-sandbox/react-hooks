import React, { useState, useMemo } from 'react';

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['hey', 'this', 'is', 'cool'];
  const word = words[wordIndex];

  // 文字列を返す
  // 無駄なループを追加しているので、処理にかなりの時間がかかる。
  // 「Next word」を押下すると、この関数が実行されるため、再描画に時間がかかる。
  const computeLetterCount = (word: string) => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };

  // `useMemo()`でラップすることにより
  // 配列（`[word]`）の値が、関数（`computeLetterCount()`）が最後に実行されたときと同じ場合
  // キャッシュされた戻り値（`computeLetterCount(word)`）を返すようになる。
  // そのため「Increment」を押下し、`setCount(count + 1)`を実行して
  // コンポーネントが再描画されても、`word`は変更されていないため、
  // `computeLetterCount(word)`は再実行されない。
  const letterCount = useMemo(() => computeLetterCount(word), [word]);

  // メモ化をしない（`useMemo()`でラップしない）場合
  // 「Increment」を押下時の再描画で、`word`が変更されていなくても
  // `computeLetterCount(word)`が実行されてしまう。
  // そのため、「Increment」を押下時の再描画も時間がかかる。
  // const letterCount = computeLetterCount(word);

  return (
    <div>
      <h2>UseMemo</h2>
      <h3>Compute number of letters (slow 🐌)</h3>
      <p>
        "{word}" has {letterCount} letters
      </p>
      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }}
      >
        Next word
      </button>

      <h3>Increment a counter (fast ⚡️)</h3>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default UseMemo;
