import { useReducer } from 'react';
import { reducer } from './reducer';
//初期stateをインポート
import { initialState } from './initialState';

//各componentをインポート
import { Form } from './components/Form';
import { Selector } from './components/Selector';
import { EmptyButton } from './components/EmptyButton';
import { FilteredTodos } from './components/FilteredTodos';

//HTML要素（JSX）を返却
export const App = (): JSX.Element => {
  //状態管理のuseReducerを定義
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * 各関数componentに状態更新用のdispatchを渡す
   * propsで渡すことで各関数componentで状態を更新することができる
   * 関数componentをmemo化することで処理を高速化(更新がなければ再計算不要)
   */
  return (
    <div>
      <Selector dispatch={dispatch} />
      {state.filter === 'removed' ? (
        <EmptyButton dispatch={dispatch} />
      ) : (
        <Form state={state} dispatch={dispatch} />
      )}
      <FilteredTodos state={state} dispatch={dispatch} />
    </div>
  );
};