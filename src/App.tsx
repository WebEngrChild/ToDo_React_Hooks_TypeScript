// React から useState フックをインポート
import { useState } from 'react';

//Todo 型オブジェクトの型エイリアスを定義
type Todo = {
  value: string;
};

export const App = () => {
  /**
   * text = ステートの値
   * setText = ステートの値を更新するメソッド
   * useState の引数 = ステートの初期値 (=空の文字列)
   */
    const [text, setText] = useState('');

    // Todo 型オブジェクトの配列を代入するため明示的にアノテート
    const [todos, setTodos] = useState<Todo[]>([]);

    // todosステートを更新する関数
    const handleOnSubmit = () => {
      // 何も入力されていなかったらリターン
      if (!text) return;

      // 新しい Todo を作成
      const newTodo: Todo = {
        value: text,
      };

      /**
       * スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
       * 以下と同義
       *
       * const oldTodos = todos.slice();
       * oldTodos.unshift(newTodo);
       * setTodos(oldTodos);
       *
       **/

      //setTodosの引数には配列内にobjectが格納されてる→...todosでobjectのみを展開して、newTodo※objectで配列内にobjectが並ぶ形にしている
      setTodos([newTodo, ...todos]);

      // フォームへの入力をクリアする
      setText('');
    };

    return (
    <div>
      {/* コールバックとして () => handleOnSubmit() を渡す */}
      {/* フォームでエンターを押した際に送信される */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {/*
          入力中テキストの値を text ステートが
          持っているのでそれを value として表示

          onChange イベント（＝入力テキストの変化）を
          text ステートに反映する
          */}
          
        {/* inputで送信された時に */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* 上に同じ */}
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
    </div>
  );
};