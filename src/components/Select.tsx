import { SyntheticEvent } from 'react';

interface InputProps {
  options: Record<string, string>;
  onSelect: (value: string) => void;
  defaultSelect: string;
}

const Select: React.FC<InputProps> = ({ options, onSelect, defaultSelect }) => {
  function onHandleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    onSelect(value);
  }

  return (
    <select
      className="select select-bordered w-full max-w-xs mt-5"
      onChange={onHandleSelect}
    >
      <option value="" disabled selected>
        {defaultSelect}
      </option>
      {Object.entries(options).map(([key, label]) => (
        <option key={key} value={key}>
          {label as React.ReactNode}
        </option>
      ))}
    </select>
  );
};

export default Select;
