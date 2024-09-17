import "./OptionStyles.css";

type OptionProps = {
  selectedOptions: string[];
  correctSelection: string[];
  value: string;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Option = ({
  selectedOptions,
  correctSelection,
  value,
  onSelect,
}: OptionProps) => {
  const isSelected =
    selectedOptions.includes(value) || correctSelection.includes(value);
  const isIncorrect = selectedOptions.length === 2 && isSelected;
  const isCorrect = correctSelection.includes(value);

  return (
    <button
      className={`option 
        ${isSelected && "selected"} 
        ${isIncorrect && "incorrect"} 
        ${isCorrect && "correct"}
      `}
      data-value={value}
      key={value}
      onClick={onSelect}
    >
      {value}
    </button>
  );
};

export default Option;
