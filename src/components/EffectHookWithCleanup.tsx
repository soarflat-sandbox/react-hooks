import React, { useState, useEffect } from 'react';

const LIMIT = 60;

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(LIMIT);

  const reset = () => {
    setTimeLeft(LIMIT);
  };

  const tick = () => {
    console.log('tick');
    setTimeLeft(prevTime => (prevTime === 0 ? LIMIT : prevTime - 1));
  };

  useEffect(() => {
    console.log('render Timer');
    const timerId = setInterval(tick, 1000);

    return () => {
      console.log('cleanup Timer');
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
      <p>time: {timeLeft}</p>
      <button onClick={reset}>reset</button>
    </div>
  );
};

const EffectHookWithCleanup: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h2>EffectHookWithCleanup</h2>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        toggle Timer
      </button>
      {visible ? <Timer /> : ''}
    </div>
  );
};

export default EffectHookWithCleanup;
