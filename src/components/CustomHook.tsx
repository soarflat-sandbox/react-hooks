import React, { useState, useEffect } from 'react';

// Custom Hook
function useStatus(): { isOnline: boolean; toggleStatus: () => void } {
  const [isOnline, setState] = useState(true);

  const toggleStatus = () => {
    setState(!isOnline);
  };

  useEffect(() => {
    console.log('render by Custom Hook');

    return () => {
      console.log('cleanup by Custom Hook');
    };
  });

  return { isOnline, toggleStatus };
}

const Status: React.FC = () => {
  const { isOnline, toggleStatus } = useStatus();
  return (
    <p>
      <span>{isOnline ? 'Online' : 'Offline'}</span>
      <button onClick={toggleStatus}>toggleStatus</button>
    </p>
  );
};

const StatusIcon: React.FC = () => {
  const { isOnline, toggleStatus } = useStatus();
  return (
    <p>
      <span style={{ color: isOnline ? 'green' : 'red' }}>●</span>
      <button onClick={toggleStatus}>toggleStatus</button>
    </p>
  );
};

const CustomHook: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>CustomHook</h2>
      <div>
        <StatusIcon />
        <Status />
      </div>
      <p>You clicked {count} times</p>
      {/* setCount() を実行することで CustomHook コンポーネント全体が
      再描画されるため、Custom Hook のログが出力される。*/}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default CustomHook;
