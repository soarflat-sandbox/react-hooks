import React, { useState, useEffect } from 'react';

const EffectHookOnlyReRunIfCountChanges: React.FC = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log('count changes in EffectHookOnlyReRunIfCountChanges');
  }, [count]);

  return (
    <div>
      <h2>EffectHookOnlyReRunIfCountChanges</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setVisible(!visible)}>toggle visible</button>
      {visible ? (
        <button onClick={() => setCount(count + 1)}>Click me</button>
      ) : (
        ''
      )}
    </div>
  );
};

export default EffectHookOnlyReRunIfCountChanges;
