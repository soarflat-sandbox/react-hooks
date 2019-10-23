import React, { useState, useEffect } from 'react';

const ChildComponent: React.FC = () => {
  useEffect(() => {
    console.log('render ChildComponent');

    return () => {
      console.log('cleanup ChildComponent');
    };
  });

  return (
    <div>
      <p id="effectHookWithCleanup">child component</p>
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
        toggle component
      </button>
      {visible ? <ChildComponent /> : ''}
    </div>
  );
};

export default EffectHookWithCleanup;
