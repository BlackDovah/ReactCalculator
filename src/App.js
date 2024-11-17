import React, { useEffect, useState, useRef } from "react";
import { evaluate } from "mathjs";
import Numpad from "./components/Numpad";
import "./output.css";

function App() {
  const [result, setResult] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const resultRef = useRef(result);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  function execute() {
    try {
      const resultValue = evaluate(resultRef.current);
      setResult(resultValue.toString());
      setCursorPosition(resultValue.toString().length);
    } catch {
      setResult("Error");
      setCursorPosition(0);
    }
  }

  useEffect(() => {
    function handleKeyPress(event) {
      const key = event.key;
      if (!isNaN(key) || "+-*/.()".includes(key)) {
        console.log("Keys: ", key);
        const newResult =
          result.slice(0, cursorPosition) + key + result.slice(cursorPosition);
        setResult(newResult);
        setCursorPosition(cursorPosition + 1);
        console.log("results: ", resultRef);
      } else if (key === "Enter") {
        console.log("Evaluating on Enter: ", resultRef);
        execute();
      } else if (key === "Backspace") {
        if (cursorPosition > 0) {
          const newResult =
            result.slice(0, cursorPosition - 1) + result.slice(cursorPosition);
          setResult(newResult);
          setCursorPosition(cursorPosition - 1);
        }
      } else if (key === "ArrowLeft") {
        setCursorPosition(Math.max(0, cursorPosition - 1));
      } else if (key === "ArrowRight") {
        setCursorPosition(Math.min(result.length, cursorPosition + 1));
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [cursorPosition]);

  function deleteLast() {
    if (cursorPosition > 0) {
      const newResult =
        result.slice(0, cursorPosition - 1) + result.slice(cursorPosition);
      setResult(newResult);
      setCursorPosition(cursorPosition - 1);
    }
  }

  function clear() {
    setResult("");
    setCursorPosition(0);
  }

  return (
    <div className="bg-gray-950 p-4 border-gray-950 h-screen flex items-center justify-center">
      <div className="border-4 border-gray-700 h-full w-full p-4 flex flex-col">
        {/* Display area */}
        <div className="text-gray-300 h-1/6 bg-gray-400 text-5xl border-8 border-gray-600 mb-3 flex items-center justify-start p-4 overflow-hidden">
          <span className="relative">
            {result.split("").map((char, index) => (
              <span
                key={index}
                className={`${cursorPosition === index ? "bg-white text-black" : ""}`}>{char}</span>
            ))}
            {/* Cursor at the end */}
            {cursorPosition === result.length && (
              <span className="bg-white text-black">&nbsp;</span>
            )}
          </span>
        </div>
        {/* Buttons */}
        <div className="text-white grid grid-cols-4 h-5/6 bg-gray-900 gap-10 text-3xl">
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-1 row-start-1 bg-red-950" onClick={(e) => { clear(); e.target.blur(); }}>CLR</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-2 row-start-1 bg-red-950" onClick={(e) => { deleteLast(); e.target.blur(); }}>&#129092;</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-3 row-start-1 bg-blue-900" onClick={(e) => {
            setResult(result + "("); e.target.blur(); const newResult =
              result.slice(0, cursorPosition) +
              "(" +
              result.slice(cursorPosition);
            setResult(newResult);
            setCursorPosition(cursorPosition + 1);
          }}>(</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-1 bg-blue-900" onClick={(e) => {
            setResult(result + ")"); e.target.blur(); const newResult =
              result.slice(0, cursorPosition) +
              ")" +
              result.slice(cursorPosition);
            setResult(newResult);
            setCursorPosition(cursorPosition + 1);
          }}>)</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-5 bg-blue-900" onClick={(e) => {
            setResult(result + "+"); e.target.blur(); const newResult =
              result.slice(0, cursorPosition) +
              "+" +
              result.slice(cursorPosition);
            setResult(newResult);
            setCursorPosition(cursorPosition + 1);
          }}>+</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-4 bg-blue-900" onClick={(e) => {
            setResult(result + "-"); e.target.blur(); const newResult =
              result.slice(0, cursorPosition) +
              "-" +
              result.slice(cursorPosition);
            setResult(newResult);
            setCursorPosition(cursorPosition + 1);
          }}>-</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-3 bg-blue-900" onClick={(e) => {
            setResult(result + "*"); e.target.blur(); const newResult =
              result.slice(0, cursorPosition) +
              "*" +
              result.slice(cursorPosition);
            setResult(newResult);
            setCursorPosition(cursorPosition + 1);
          }}>x</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-2 bg-blue-900" onClick={(e) => {
            setResult(result + "/"); e.target.blur(); const newResult =
              result.slice(0, cursorPosition) +
              "/" +
              result.slice(cursorPosition);
            setResult(newResult);
            setCursorPosition(cursorPosition + 1);
          }}>/</button>
          <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-3 row-start-5 bg-green-950" onClick={(e) => { execute(); e.target.blur(); }}>=</button>
          <Numpad
            setResult={setResult}
            result={result}
            cursorPosition={cursorPosition}
            setCursorPosition={setCursorPosition}
          />
        </div>
      </div>
    </div>
  );
}

export default App;