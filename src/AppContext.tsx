//reactモジュールからcontextと更新用のDispatchを取得
import { createContext, Dispatch } from 'react';

/**
 * ①contextを作成する -> createContext({} as { state: State; dispatch: Dispatch<Action> }
 *  ※空のオブジェクトにasでアサーションを行う
 * ②<AppContext.Provider value={{ state, dispatch }}>でラップして各コンポーネントに渡す
 * ③contextを利用する -> const { dispatch } = useContext(AppContext);
 *  ※①を引数にすることで分割代入
 */ 

export const AppContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);