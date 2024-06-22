import { forwardRef, HTMLProps } from 'react';
import css from './Input.module.scss';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
}

type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>(function Input(
  { label, error, ...props },
  ref
) {
  return (
    <fieldset className={css.fieldset}>
      <label htmlFor={props.htmlFor}>{label}</label>
      <input autoComplete="true" ref={ref} {...props} />
      {error && <span className={css.errorMessage}>{error}</span>}
    </fieldset>
  );
});

Input.displayName = 'Input';
