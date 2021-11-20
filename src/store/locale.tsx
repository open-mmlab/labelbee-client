/**
 * 用于记录当前项目的语言
 */

import * as React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

interface ILocale {
  locale: typeof zhCN | typeof enUS;
}

type Action = {
  type: 'UPDATE_LOCALE';
  payload: any;
};

const initialState: ILocale = {
  locale: enUS,
};

const reducer = (state: ILocale = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_LOCALE': {
      const locale = action.payload.locale;
      return { ...state, locale };
    }

    default:
      throw new Error();
  }
};
interface ILocaleContext {
  state: typeof initialState;
  dispatch: (action: Action) => void;
}
export const LocaleContext = React.createContext<ILocaleContext>({
  state: initialState,
  dispatch: () => {},
});

export function LocaleProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <LocaleContext.Provider value={value}>{props.children}</LocaleContext.Provider>;
}

// 减少引入 context
export const useLocale = () => {
  const context: ILocaleContext = React.useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale 必须在 LocaleProvider 中使用 ');
  }
  return context;
};
