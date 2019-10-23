import React, { useState } from 'react';

const StateHook: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Introducing Hooks</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default StateHook;
