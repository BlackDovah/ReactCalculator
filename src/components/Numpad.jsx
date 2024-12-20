const Numpad = ({ result, setResult, cursorPosition, setCursorPosition }) => {
  const numpad = [
    "7", "8", "9",
    "4", "5", "6",
    "1", "2", "3",
    "0", ".",
  ];

  return numpad.map((buttonLabel, index) => {
    const colStart = (index % 3) + 1;
    const rowStart = Math.floor(index / 3) + 1;

    return (
      <button
        key={buttonLabel}
        className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-{colStart} row-start-{rowStart} bg-gray-700"
        onClick={(e) => {
            setResult(result + buttonLabel); e.target.blur(); const newResult =
              result.slice(0, cursorPosition) +
              buttonLabel +
              result.slice(cursorPosition);
            setResult(newResult);
            setCursorPosition(cursorPosition + 1);
        }}
      >
        {buttonLabel}
      </button>
    );
  });
};
export default Numpad;
