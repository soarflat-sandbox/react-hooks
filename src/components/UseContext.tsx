import React, { createContext, useContext } from 'react';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
};

const ThemeContext = createContext(themes.light);

const UseContext = () => {
  return (
    <>
      <ThemeContext.Provider value={themes.dark}>
        <h2>UseContext</h2>
        <Component />
      </ThemeContext.Provider>
      <BrotherComponent />
    </>
  );
};

const Component = () => {
  return <GrandChildComponent />;
};

const GrandChildComponent = () => {
  // ツリー内の最も近い上位の一致する`Provider`（`<ThemeContext.Provider value={themes.dark}>`）から
  // コンテクストの値を取得する。そのため、このコンポーネントの`theme`は
  // {
  //   foreground: '#ffffff',
  //   background: '#222222'
  // }
  // になる
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
};

const BrotherComponent = () => {
  // このコンポーネントはツリー内の最も近い上位の一致する`Provider`が存在しない（`<ThemeContext.Provider value={themes.dark}>`でラップされていない）。
  // そのため、コンテクスト生成時（`createContext(themes.light)`）に指定した初期値（`themes.light`）を利用する。
  // このコンポーネントの`theme`は
  // {
  //   foreground: '#000000',
  //   background: '#eeeeee'
  // }
  // になる
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by default theme context!
    </button>
  );
};

export default UseContext;
