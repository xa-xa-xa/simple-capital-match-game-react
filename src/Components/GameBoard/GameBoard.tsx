import { useEffect, useState } from "react";
import Option from "../Option/Option";
import "./gameBoardStyles.css";

const shuffle = (array: string[]) => array.sort((a, b) => 0.5 - Math.random());

type DATA = {
  data: {
    [key: string]: string;
  };
};

const GameBoard = ({ data }: DATA) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [correctSelection, setCorrectSelection] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());

  useEffect(() => {
    const options = Object.entries(data).flat();

    setOptions(shuffle(options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement;
    const value = button.getAttribute("data-value")!;
    const newSelection = [...selectedOptions, value];

    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      if (data[first] === second || data[second] === first) {
        // correct selection
        setCorrectSelection(newSelection);

        setTimeout(() => {
          setMatched(new Set([...matched, ...newSelection]));
          setCorrectSelection([]);
          setSelectedOptions([]);
        }, 500);
      } else {
        // incorrect selection
        setSelectedOptions(newSelection);
        setTimeout(function reset() {
          setSelectedOptions([]);
        }, 1000);
      }
    } else if (newSelection.length === 1) {
      setSelectedOptions(newSelection);
    } else {
      //not allow more than two selections
      setSelectedOptions([]);
    }
  };

  //

  return (
    <div>
      <h2>Match Capital Cities</h2>
      <div className="game-board">
        {matched.size === options.length && options.length && (
          <>
            <h1 style={{ color: "gold" }}>Congratulation! You won!</h1>
            <button
              onClick={() => {
                setMatched(new Set());
                setOptions(shuffle(options));
              }}
            >
              reset
            </button>
          </>
        )}
        {options.map((option) => {
          if (matched.has(option)) {
            return null;
          }
          //
          return (
            <Option
              onSelect={onSelect}
              selectedOptions={selectedOptions}
              correctSelection={correctSelection}
              value={option}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
