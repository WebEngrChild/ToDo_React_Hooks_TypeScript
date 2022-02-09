//reactモジュールからcontextと更新用のDispatchを取得
import { createContext, Dispatch } from 'react';

/**
 * contextを作成する -> createContext
 * contextを利用する -> useContext
 */ 

/**
 * <AppContext.Provider value={{ state, dispatch }}>を用いることで
 * propsを利用しなくても各component内でstateとdispatchを利用することができる
 * 引数は空オブジェクトに型アサーションをしている
 */ 
export const AppContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);