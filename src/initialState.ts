export const initialState: State = {
  text: '',
  todos: [{
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
  },],
  filter: 'all',
};