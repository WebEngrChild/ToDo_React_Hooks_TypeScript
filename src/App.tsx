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

//デフォルトの値
const initialTodos: Todo[] = [
  {
    value: 'TODO #5',
    id: 4,
    checked: false,
    removed: false,
  },
  {
    value: 'TODO #4',
    id: 3,
    checked: true,
    removed: false,
  },
  {
    value: 'TODO #3',
    id: 2,
    checked: false,
    removed: true,
  },
  {
    value: 'TODO #2',
    id: 1,
    checked: true,
    removed: true,
  },
  {
    value: 'TODO #1',
    id: 0,
    checked: false,
    removed: false,
  },
];

//関数コンポーネントAppを定義
export const App = () => {

    //フックの定義
    const [text, setText] = useState('');
    // Todo 型オブジェクト群の配列を代入するため明示的にアノテート(初期値はinitialTodos)
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
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

      //ステートに値を追加
      setTodos([newTodo, ...todos]);

      // フォームへの入力をクリアする
      setText('');
    };

    //関数：登録済みTodoの編集
    const handleOnEdit = (id: number, value: string) => {
      const deepCopy = todos.map((todo) => ({ ...todo }));
      const newTodos = deepCopy.map((todo) => {
        if (todo.id === id) {
          todo.value = value;
        }
        return todo;
      });

      setTodos(newTodos);
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

    //関数：ゴミ箱を空にする
    const handleOnEmpty = () => {
      const newTodos = todos.filter((todo) => !todo.removed);
      setTodos(newTodos);
    };

    //関数コンポーネント:HTMLの描画
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

      {/*フィルターでゴミ箱の時のみ完全削除機能を表示（三項演算子） */}
      {filter === 'removed' ? (
        <button
           onClick={handleOnEmpty}
           disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
        
      ) : (
        
      // フォーム：enter押下時のevent設定（submit）
      <form onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {/* テキスト入力 */}
        <input 
          type="text" 
          value={text} 
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
                disabled={todo.removed}
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