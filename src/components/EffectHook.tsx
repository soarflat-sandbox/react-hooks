import React, { useState, useEffect } from 'react';

const EffectHook: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (document.getElementById(
      'effectHook'
    ) as HTMLElement).innerText = `You clicked ${count} times`;
  });

  return (
    <div>
      <h2>EffectHook</h2>
      <p id="effectHook"></p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default EffectHook;
