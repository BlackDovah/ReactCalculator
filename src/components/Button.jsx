const Buttons = ({ result, setResult, cursorPosition, setCursorPosition }) => {
    const buttons = ["(", ")", "/", "*", "-", "+"];
  
    return buttons.map((buttonLabel, index) => {
      const colStart = (index % 3) + 1;
      const rowStart = Math.floor(index / 3) + 1;
      console.log(colStart, rowStart)
  
      return (
        <button
          key={buttonLabel}
          className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-4 bg-blue-900"
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
  export default Buttons;
  