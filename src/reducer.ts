/**
 * reducerの実行である"dispatch(action)で呼び出される関数本体
 * dispatch({ type: 'change', text: e.target.value });
 * 第一引数はこのモジュール内で利用するstate
 * 第二引数はdispatchで渡されるactionを別ファイルで定義されるActionで型定義
 */

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    //textはinput入力値
    case 'change': {
      //分割代入を行なってstateの該当箇所のみに更新をかけている
      return { ...state, text: action.text };
    }

    case 'check': {
      const deepCopy = state.todos.map((todo) => ({ ...todo }));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.checked = !action.checked;
        }
        return todo;
      });

      return { ...state, todos: newTodos };
    }

    case 'edit': {
      const deepCopy = state.todos.map((todo) => ({ ...todo }));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.value = action.value;
        }
        return todo;
      });

      return { ...state, todos: newTodos };
    }

    case 'empty': {
      const newTodos = state.todos.filter((todo) => !todo.removed);

      return { ...state, todos: newTodos };
    }

    case 'filter': {
      return { ...state, filter: action.filter };
    }

    case 'remove': {
      const deepCopy = state.todos.map((todo) => ({ ...todo }));

      const newTodos = deepCopy.map((todo) => {
        if (todo.id === action.id) {
          todo.removed = !action.removed;
        }
        return todo;
      });

      return { ...state, todos: newTodos };
    }

    case 'submit': {
      //返り値はstateに制限しているため例外処理では何も変化がないというstateをそのまま返している
      if (!state.text) return state;

      const newTodo: Todo = {
        value: state.text,
        id: new Date().getTime(),
        checked: false,
        removed: false,
      };

      return { ...state, todos: [newTodo, ...state.todos], text: '' };
    }

    default: {
      return state;
    }
  }
};