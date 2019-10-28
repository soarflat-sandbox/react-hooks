import React, { useState, useEffect } from 'react';

type Props = {
  initialCount: number;
};

// `useState()`で宣言した State が Props でも更新されるコンポーネント
const Component: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  // props.initialCount が更新されたら、コンポーネントの State を更新
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

const StateHookWithProps: React.FC = () => {
  const [count, setCount] = useState(10);
  const reset = () => {
    setCount(Math.floor(Math.random() * 10000));
  };

  return (
    <div>
      <h2>StateHookWithProps</h2>
      <Component initialCount={count} />
      <button onClick={reset}>reset initialCount</button>
    </div>
  );
};

export default StateHookWithProps;
