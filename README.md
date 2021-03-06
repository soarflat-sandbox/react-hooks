# React Hooks

Hooks を触れる。

## Effect Hook

Functional component で副作用（side effects）を実行できる Hook。

### 副作用（side effects）

コンポーネントに影響を与える可能性があるもの。

- 外部データの取得や購読
- 手動での DOM 動作

### 利用例

Effect Hook は`useEffect()`という名前の関数で利用できる。以下は`useEffect()`の利用例。

```jsx
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
```

上記のコードで`useEffect()`で定義されている関数が副作用関数であり、React のレンダリング後に実行される。

```tsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

### `useEffect()`が呼ばれるタイミング

デフォルトでは、`useEffect()`は**毎レンダリング後に呼ばれる**（タイミングの制御は後述）。

### コンポーネントがアンマウントされるときに副作用（クリーンアップ）を実行する

以下のように`useEffect()`で関数を返せば、コンポーネントがアンマウントされるときにそれが実行される。

```tsx
useEffect(() => {
  return () => {
    console.log('cleanup ChildComponent');
  };
});
```

以下は利用例。

```tsx
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
```

### 特定の State や Props が更新された時だけ副作用を実行する

第２引数の配列に State や Props を渡せば、それらが更新された時だけ副作用が実行される。

以下の場合、`count`が更新された時だけ、副作用が実行される。

```tsx
useEffect(() => {
  console.log('count changes in EffectHookOnlyReRunIfCountChanges');
}, [count]);
```

そのため、以下は`visible`という State も存在するが、これが更新されても副作用は実行されない。

```tsx
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
```

#### 注意点

副作用が古い State を参照することを防ぐために、副作用で利用する State や Props は必ず第２引数の配列に指定する。

そのため、以下のように副作用で`visible`を利用しているのに、第２引数の配列に`visible`を指定していないのは NG。

```tsx
useEffect(() => {
  console.log('count changes in EffectHookOnlyReRunIfCountChanges');
  console.log('visible', visible);
}, [count]);
```

### 副作用を一度だけ実行する

第２引数に空の配列（`[]`）を渡せば、副作用は１度だけ実行される。

```tsx
useEffect(() => {
  console.log('side effects');
}, []);
```

### Effect Hook でクリーンアップが実行されるタイミングで理解が曖昧な点

以下は`useEffect()`を利用している単純な例。

```tsx
import React, { useState, useEffect } from 'react';

const EffectHook: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (document.getElementById(
      'effectHook'
    ) as HTMLElement).innerText = `You clicked ${count} times`;

    return () => {
      console.log('cleanUp');
    };
  });

  return (
    <div>
      <h2>EffectHook</h2>
      <p id="effectHook"></p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

「Click me」をクリックすると、`setCount(count + 1)`が実行され、コンポーネント（DOM）が再描画される。

そのため、`useEffect()`内の以下が実行される。

```tsx
(document.getElementById(
  'effectHook'
) as HTMLElement).innerText = `You clicked ${count} times`;
```

んで、なぜかこの時にコンポーネントがアンマウントされるタイミングで実行されるはずのクリーンアップも実行される。

```tsx
return () => {
  console.log('cleanUp');
};
```

なので

1. `setCount(count + 1)`が実行される
2. `<EffectHook>`コンポーネントが再描画される
3. 再描画のタイミングで`<EffectHook>`コンポーネントが一旦アンマウントされる

と思った。

#### ↑ は勘違いで普通にドキュメントに書いてあった

[エフェクトのクリーンアップ](https://ja.reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect)

> メモリリークを防止するため、コンポーネントが UI から削除される前にクリーンアップ関数が呼び出されます。それに加えて、コンポーネントが複数回レンダーされる場合（大抵はそうですが）、**新しい副作用を実行する前に前回の副作用はクリーンアップされます**。この例では、更新が発生する度に新しい購読が作成される、ということです。毎回の更新で副作用が実行されるのを抑制するためには、後の節をご覧ください。

というわけで、アンマウントされるタイミングだけではなく、副作用が実行されるたびにクリーンアップが実行される仕様だった。

そのため、以下のように`useEffect()`は分けて一度だけ副作用が実行されるようにすれば、クリーンアップ処理は一度だけ実行される。

```tsx
import React, { useState, useEffect } from 'react';

const EffectHook: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (document.getElementById(
      'effectHook'
    ) as HTMLElement).innerText = `You clicked ${count} times`;
  });

  useEffect(() => {
    return () => {
      console.log('cleanUp');
    };
  }, []);

  return (
    <div>
      <h2>EffectHook</h2>
      <p id="effectHook"></p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

## Custom Hook

独自に作成できる Hook。

Custom Hook を作成することで、コンポーネントからロジックを抽出して再利用可能な関数を作成できる。

### Custom Hook を定義する

以下のように`use`がつく関数を定義すれば、それを Custom Hook として利用できる。

```tsx
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
```
