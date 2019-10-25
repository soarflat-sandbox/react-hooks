import React from 'react';
import StateHook from './components/StateHook';
import EffectHook from './components/EffectHook';
import EffectHookWithCleanup from './components/EffectHookWithCleanup';
import EffectHookOnlyReRunIfCountChanges from './components/EffectHookOnlyReRunIfCountChanges';
import UseReducer from './components/UseReducer';

const App: React.FC = () => {
  return (
    <div>
      <h1>Learning Hooks</h1>
      <StateHook />
      <EffectHook />
      <EffectHookWithCleanup />
      <EffectHookOnlyReRunIfCountChanges />
      <UseReducer initialCount={10} />
    </div>
  );
};

export default App;
