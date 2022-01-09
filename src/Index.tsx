import { useReducer } from 'react';
import { reducer } from './reducer';
//初期stateをインポート
import { initialState } from './initialState';

//各componentをインポート
import { Form } from './components/Form';
import { Selector } from './components/Selector';
import { EmptyButton } from './components/EmptyButton';
import { FilteredTodos } from './components/FilteredTodos';

//Contextをインポートする
import { AppContext } from './AppContext';

export const App = () => {
  // 状態管理のuseReducerを定義
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <Selector />
        {state.filter === 'removed' ? <EmptyButton /> :  <Form /> }
        <FilteredTodos />
      </div>
    </AppContext.Provider>
  );
};