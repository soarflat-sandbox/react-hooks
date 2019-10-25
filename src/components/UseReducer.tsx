import React, { useReducer } from 'react';

type State = {
  count: number;
};
type INCREMENT_ACTION = { type: 'increment' };
type DECREMENT_ACTION = { type: 'decrement' };
type RESET_ACTION = { type: 'reset'; payload: number };
type Actions = INCREMENT_ACTION | DECREMENT_ACTION | RESET_ACTION;

// 初期 State を生成する関数
function init(initialCount: number): State {
  return { count: initialCount };
}

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

type Props = {
  initialCount: number;
};

const UseReducer: React.FC<Props> = ({ initialCount }) => {
  // `init()`関数に`initialCount`が渡されて実行された結果が初期 State になる
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <div>
      <h2>UseReducer</h2>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button
        onClick={() => dispatch({ type: 'reset', payload: initialCount })}
      >
        Reset
      </button>
    </div>
  );
};

export default UseReducer;
