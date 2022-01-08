import { Dispatch, memo } from 'react';

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const Form = memo((props: Props) => {
  const handleOnSubmit = () => {
    props.dispatch({ type: 'submit' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.dispatch({ type: 'change', text: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
      <input
        type="text"
        disabled={props.state.filter === 'checked'}
        value={props.state.text}
        onChange={handleOnChange}
      />
      <input
        type="submit"
        disabled={props.state.filter === 'checked'}
        value="追加"
        onSubmit={handleOnSubmit}
      />
    </form>
  );
});

Form.displayName = 'Form';