// 'React' から 'useState' フックをインポート
import { useState } from 'react';

//Todo型オブジェクトの型エイリアスを定義
type Todo = {
  value: string;
  readonly id: number; //一意であるidは変更されてはいけない
  checked: boolean;
  removed: boolean;
};

//フィルターの状態をあらわす Filter 型
type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

//関数コンポーネントAppを定義
export const App = () => {
  /**
   * text = ステートの値
   * setText = ステートの値を更新するメソッド
   * useState の引数 = ステートの初期値 (=空の文字列)
   */

    //フックの定義
    const [text, setText] = useState('');
    // Todo 型オブジェクト群の配列を代入するため明示的にアノテート(初期値は空配列)
    const [todos, setTodos] = useState<Todo[]>([]);
    //フィルター型として現在のフィルター状態を格納(初期値はall)
    const [filter, setFilter] = useState<Filter>('all');

    // 関数：inputのtextステートを更新(コールバックのe部分に型定義を行っている)
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    };

    // 関数：todosステートを更新
    const handleOnSubmit = () => {
      // 何も入力されていなかったらリターン
      if (!text) return;

      // 新しい Todo を作成
      const newTodo: Todo = {
        value: text,
        id: new Date().getTime(),
        checked: false,
        removed: false,
      };

      /**
       * スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
       * 以下と同義
       * const oldTodos = todos.slice(); //配列の複製
       * oldTodos.unshift(newTodo); //配列に新規todoを追加
       * setTodos(oldTodos); //ステートに新しいtodo配列を追加する
       *
       **/

      /**
       * setTodosの引数には配列内にobjectが格納
       * ...todosでobjectのみを展開
       * newTodoはもともとオブジェクト型
       * objectで配列内にobjectが並ぶ形に変化
       * 新しくコピーした配列[]を準備
       * 配列の要素"そのもの"の追加である＝シャローコピーでもイミュータブルを維持
       */

      setTodos([newTodo, ...todos]);

      // フォームへの入力をクリアする
      setText('');
    };

    //関数：登録済みTodoの編集
    const handleOnEdit = (id: number, value: string) => {
      /**
       * ディープコピー:
       * オブジェクトが内抱している各要素をスプレッド構文で展開
       * obj内のpropatyを展開して{オブジェクト}としている
       */
      const deepCopy = todos.map((todo) => ({ ...todo }));

      /**
       * 上記でディープコピーした内容に対してArray.map() を適用
       * 新しい配列を再生成する
       * 
       * 以下と同義:
       * const deepCopy = todos.map((todo) => ({
       *   value: todo.value,
       *   id: todo.id,
       * }));
       */


      /**
       * 引数として渡された todo の id が一致する
       * todos ステート（のコピー）内の todo の
       * value プロパティを引数 value (= e.target.value) に書き換える
       */
      const newTodos = deepCopy.map((todo) => {
        if (todo.id === id) {
          todo.value = value;
        }
        return todo;
      });

      // todos ステート配列をチェック（あとでコメントアウト）
      console.log('=== Original todos ===');
      todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));

      setTodos(newTodos);

      /**
      * 以下のタイミングではtodosに変化しない
      * 同じ関数のスコープ内では、関数のスコープ外の値を更新することはできない。
      * setTodosはスコープ外等別の場所に存在するステートの値を変更する。
      */
      console.log('=== expecter updated todos but not true ===');
      todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));


      /**
       * オブジェクトが複数入れ子になっている構造には注意が必要
       * 以下のようなmapの結果を配列に形はシャローコピー
       * 配列の要素内の子要素のプロパティの変更である
       * 入れ子の中身は依然として原本の要素を参照し続ける
       * 結果、setTodoでステートを更新する前にすでに変化する＝'Imutable'でない
       */

      // const newTodos = todos.map((todo) => {
      //   if (todo.id === id) {
      //     todo.value = value;
      //     }
      //   return todo;
      // });
      // console.log('=== Original todos ===');
      // todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));
      // setTodos(newTodos);
    };

    //関数：checkbox時のcallback
    const handleOnCheck = (id: number, checked: boolean) => {
      const deepCopy = todos.map((todo) => ({ ...todo }));
      const newTodos = deepCopy.map((todo) => {
        if (todo.id === id) {
          todo.checked = !checked;
        }
        return todo;
      });
  
      setTodos(newTodos);
    };

    //関数：deleted時ののcallback
    const handleOnRemove = (id: number, removed: boolean) => {
      const deepCopy = todos.map((todo) => ({ ...todo }));
      const newTodos = deepCopy.map((todo) => {
        if (todo.id === id) {
          todo.removed = !removed;
        }
        return todo;
      });
  
      setTodos(newTodos);
    };

    //関数：フィルタリング後の Todo 型の配列をリスト表示
    const filteredTodos = todos.filter((todo) => {
      // filter ステートの値に応じて異なる内容の配列を返す
      switch (filter) {
        case 'all':
          // 削除されていないもの全て
          return !todo.removed;
        case 'checked':
          // 完了済 **かつ** 削除されていないもの
          return todo.checked && !todo.removed;
        case 'unchecked':
          // 未完了 **かつ** 削除されていないもの
          return !todo.checked && !todo.removed;
        case 'removed':
          // 削除済みのもの
          return todo.removed;
        default:
          return todo;
      }
    });

    const handleOnEmpty = () => {
      /**
       * Todo 型オブジェクト内のプロパティを編集するわけではない
       * したがってイミュータビリティには影響がない
       * シャローコピーで事足りる
       */ 
      const newTodos = todos.filter((todo) => !todo.removed);
      setTodos(newTodos);
    };

    //以下が関数コンポーネントで描画される部分
    return (
    <div>
      <select 
        defaultValue="all" 
        // switch文での型による補完を受けるためfilter型としている
        onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>

      {/*フィルターでゴミ箱の時のみ完全削除機能を表示 */}
      {filter === 'removed' ? (
        <button
           onClick={handleOnEmpty}
           disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
        
      ) : (
        
      // コールバックとして () => handleOnSubmit() を渡す
      // enter押下時のevent設定（submit）
      <form onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {/*         
          入力中テキストの値を text ステートが
          持っているのでそれを value として表示
          onChange イベント（＝入力テキストの変化）を
          text ステートに更新
          */}
          
        {/* テキスト入力時のevent設定（onchange） */} 
        {/* onChange={(e) => setText(e.target.value)} ※jsx直接記述例→propsが扱いにくいのでNG */}
        <input 
          type="text" 
          value={text} 
          
          /**
           * 上記で条件分岐しているので入力フォームが描画される場合には 
           * filter === 'removed' という状態が発生し得ない
          */
          disabled={filter === 'checked'}
          onChange={(e) => handleOnChange(e)} 
        />

        {/* 追加ボタン押下時のevent設定（submit） */}
        <input
          type="submit"
          value="追加"
          disabled={filter === 'checked'}
          onSubmit={handleOnSubmit}
        />
      </form>

      )}
      {/* Todoリスト一覧の表示 */}
      {/* Reactが<li>をrenderするためにはTodos内のTodo各々の変更を検知するための'key'をliに追加する必要がある(keyはReactでの予約済みプロパティ)*/}
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};