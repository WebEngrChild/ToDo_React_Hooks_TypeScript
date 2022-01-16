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

//コンポーネントを memo 化すると props に変化がない限り再計算されないため、パフォーマンスが向上する
export const Selector = memo(() => {
  /**
   * <AppContext.Provider value={{ state, dispatch }} />が利用できるようになる
   * useContextメソッドにAppContext(型アサーション)を渡す
   * useContext(AppContext);の結果はオブジェクト群になるはず
   * const { dispatch } は分割代入→dispatchプロパティを指定して定数に代入
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