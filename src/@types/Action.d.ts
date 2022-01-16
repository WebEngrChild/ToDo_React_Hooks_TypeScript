//@typesと宣言することでプロジェクト内で型を利用することができる
declare type Action =
  | { type: 'change'; text: string }
  | { type: 'filter'; filter: Filter }
  | { type: 'submit' }
  | { type: 'empty' }
  | { type: 'edit'; id: number; value: string }
  | { type: 'check'; id: number; checked: boolean }
  | { type: 'remove'; id: number; removed: boolean };