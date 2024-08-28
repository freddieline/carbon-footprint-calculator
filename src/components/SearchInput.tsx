import { useState, KeyboardEvent, ChangeEvent } from 'react';

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
    onChangeCallback && onChangeCallback(inputValue);
  };

  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};
