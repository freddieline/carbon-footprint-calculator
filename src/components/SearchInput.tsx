import { useState, KeyboardEvent, ChangeEvent } from 'react';
import './SearchInput.css';
type onChangeCallback = (message: string) => void;
type onKeyDown = (message: KeyboardEvent<HTMLInputElement>) => void;

interface InputProps {
  onChangeCallback?: onChangeCallback;
}

export const SearchInput: React.FC<InputProps> = ({ onChangeCallback }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    // if the component receives a callback, call it,
    // and pass the input value as an argument
    onChangeCallback && onChangeCallback(inputValue);
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};
