import { useState, KeyboardEvent, ChangeEvent } from 'react';

type onChangeCallback = (message: string) => void;
type onKeyDown = (message: KeyboardEvent<HTMLInputElement>) => void;

interface InputProps {
  onChangeCallback?: onChangeCallback;
  onKeyDown: onKeyDown;
}
export const Input: React.FC<InputProps> = ({
  onChangeCallback,
  onKeyDown,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    // if the component receives a callback, call it,
    // and pass the input value as an argument
    onChangeCallback && onChangeCallback(inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(e);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
