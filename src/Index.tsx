import { useReducer } from 'react';
import { reducer } from './reducer';
//初期stateをインポート
import { initialState } from './initialState';

//各componentをインポート
import { Selector } from './components/Selector';
import { EmptyButton } from './components/EmptyButton';
import { Form } from './components/Form';
import { FilteredTodos } from './components/FilteredTodos';

//Contextをインポートする
import { AppContext } from './AppContext';

export const Index = () => {
  //状態管理のuseReducerを定義
  //初期値のinitialStateをstatenに代入している
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // 各component配下にstateとdispatchを渡す
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <Selector />
        {state.filter === 'removed' ? <EmptyButton /> :  <Form /> }
        <FilteredTodos />
      </div>
    </AppContext.Provider>
  );
};