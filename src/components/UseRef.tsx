import React, { useState, useRef, useEffect } from 'react';

const TextInputWithFocusButton: React.FC = () => {
  // useRef は ref object を返すフック
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (!inputEl.current) return;

    inputEl.current.focus();
  };

  return (
    <>
      {/* ref 属性に inputEl を指定することで、inputEl.current で DOM ノードにアクセスできる */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  // DOM ノードの参照だけではなく、コンポーネントのインスタンス変数として利用できる。
  // コンポーネントが再描画されても、参照する ref object は変わらないため、前回の State を保持することなどができる。
  // ref object が更新されてもコンポーネントは再描画されない。
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count;
  });

  return (
    <>
      <p>
        You clicked {count} times, before: {prevCountRef.current}
      </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
};

const UseRef: React.FC = () => {
  return (
    <div>
      <h2>UseRef</h2>
      <TextInputWithFocusButton />
      <Counter />
    </div>
  );
};

export default UseRef;
