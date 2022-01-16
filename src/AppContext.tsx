//reactモジュールからcontextと更新用のDispatchを取得
import { createContext, Dispatch } from 'react';

/**
 * <AppContext.Provider value={{ state, dispatch }}>を用いることで
 * propsを利用しなくても各component内でstateとdispatchを利用することができる
 * 引数は空オブジェクトかつ型定義を行なっている
 */ 
export const AppContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);