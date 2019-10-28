import React from 'react';
import StateHook from './components/StateHook';
import StateHookWithProps from './components/StateHookWithProps';
import EffectHook from './components/EffectHook';
import EffectHookWithCleanup from './components/EffectHookWithCleanup';
import EffectHookOnlyReRunIfCountChanges from './components/EffectHookOnlyReRunIfCountChanges';
import CustomHook from './components/CustomHook';
import UseReducer from './components/UseReducer';
import UseMemo from './components/UseMemo';
import UseCallback from './components/UseCallback';

const App: React.FC = () => {
  return (
    <div>
      <h1>Learning Hooks</h1>
      <StateHook />
      <StateHookWithProps />
      <EffectHook />
      <EffectHookWithCleanup />
      <EffectHookOnlyReRunIfCountChanges />
      <CustomHook />
      <UseReducer initialCount={10} />
      <UseMemo />
      <UseCallback />
    </div>
  );
};

export default App;
