import React from 'react';
import StateHook from './components/StateHook';
import StateHookWithProps from './components/StateHookWithProps';
import EffectHook from './components/EffectHook';
import EffectHookWithCleanup from './components/EffectHookWithCleanup';
import EffectHookOnlyReRunIfCountChanges from './components/EffectHookOnlyReRunIfCountChanges';
import UseContext from './components/UseContext';
import CustomHook from './components/CustomHook';
import UseReducer from './components/UseReducer';
import UseMemo from './components/UseMemo';
import UseCallback from './components/UseCallback';
import UseRef from './components/UseRef';

const App: React.FC = () => {
  return (
    <div>
      <h1>Learning Hooks</h1>
      <StateHook />
      <StateHookWithProps />
      <EffectHook />
      <EffectHookWithCleanup />
      <EffectHookOnlyReRunIfCountChanges />
      <UseContext />
      <CustomHook />
      <UseReducer initialCount={10} />
      <UseMemo />
      <UseCallback />
      <UseRef />
    </div>
  );
};

export default App;
