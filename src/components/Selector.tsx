//ReactモジュールからmemoとuseContextをインポート
import { memo, useContext } from 'react';
//型アサーションファイルをインポート
import { AppContext } from '../AppContext';

/**
 * Contextを用いないでpropsでやりとりする場合
 * 親コンポーネント側：
 * 要素の属性に設定するとコンポーネントに渡せる
    <Selector dispatch={dispatch} />
 *
 * 子コンポーネント側：
 * Propsの定義：
    type Props = {
    dispatch: Dispatch<Action>;
    };
 */

export const Selector = memo(() => {
  /**
   * useContextメソッドに型アサーションを渡す
   * 分割代入→dispatchプロパティを指定して定数に代入
   * <AppContext.Provider value={{ state, dispatch }} />が利用できるようになる
   */
  const { dispatch } = useContext(AppContext);
  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'filter', filter: e.target.value as Filter });
  };

  return (
    <select defaultValue="all" onChange={handleOnFilter}>
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
  );
});

Selector.displayName = 'Selector';