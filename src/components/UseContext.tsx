import React, { createContext, useContext, useState, useMemo } from 'react';

type ThemeProps = {
  foreground: string;
  background: string;
};

interface Themes {
  [key: string]: ThemeProps;
}

const themes: Themes = {
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

const UseContext: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const themeProps = useMemo<ThemeProps>(() => themes[theme], [theme]);
  const handleToggleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <ThemeContext.Provider value={themeProps}>
        <h2>UseContext</h2>
        <Component />
      </ThemeContext.Provider>
      <BrotherComponent />
      <p>
        <button onClick={handleToggleClick}>Toggle Theme</button>
      </p>
    </>
  );
};

const Component: React.FC = () => {
  return <GrandChildComponent />;
};

const GrandChildComponent: React.FC = () => {
  // ツリー内の最も近い上位の一致する`Provider`（`<ThemeContext.Provider value={themeProps}>`）から
  // コンテクストの値を取得する。そのため、このコンポーネントの初期描画時の`theme`は
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

const BrotherComponent: React.FC = () => {
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
