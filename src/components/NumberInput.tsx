interface InputProps {
    placeholder: string;
}

const NumberInput: React.FC<InputProps> = ({placeholder}) => {
  return (
    <label className="input input-bordered flex items-center gap-2 mt-5 w-80">
      <input type="number"
           className="grow"
        placeholder={placeholder}
      ></input>
    </label>
  );
};

export default NumberInput;
