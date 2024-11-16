import React, { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import "./output.css";

function App() {
  const [result, setResult] = useState("");

  function execute() {
    try {
      const resultValue = evaluate(result);
      setResult(resultValue.toString());
    } catch {
      setResult("Error");
    }
  }

  useEffect(() => {
    function handleKeyPress(event) {
      const key = event.key;
      if (!isNaN(key) || "+-*/.".includes(key)) {
        console.log("Keys: ", key);
        setResult((prev) => prev + key);
        console.log("results: ", result);
      } else if (key === "Enter") {
        console.log("Evaluating on Enter: ", result);
        execute();
      } else if (key === "Backspace") {
        setResult((prev) => prev.slice(0, -1));
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [result]);

  function deleteLast() {
    setResult((prev) => prev.slice(0, -1));
  }

  function clear() {
    setResult("");
  }

  return (
    <div className="bg-gray-950 p-10 border-8 border-gray-950">
      <div className="text-gray-300 h-40 bg-gray-400 p-10 text-5xl border-8 border-gray-600 mb-3">
        {result}
      </div>
      <div className="text-white h-screen grid grid-cols-4 grid-rows-5 bg-gray-900 gap-10">
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-2 row-start-1 bg-red-950" onClick={(e) => {deleteLast(); e.target.blur();}}>&#129092;</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-1 row-start-1 bg-red-950" onClick={(e) => {clear(); e.target.blur();}}>CLR</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-4 bg-blue-900" onClick={(e) => {setResult(result + "+"); e.target.blur();}}>+</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-3 bg-blue-900" onClick={(e) => {setResult(result + "-"); e.target.blur();}}>-</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-2 bg-blue-900" onClick={(e) => {setResult(result + "*"); e.target.blur();}}>x</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-4 row-start-1 bg-blue-900" onClick={(e) => {setResult(result + "/"); e.target.blur();}}>/</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-3 row-start-5 bg-green-950" onClick={(e) => {execute(); e.target.blur();}}>EXE</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-1 row-start-5 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "0"); e.target.blur();}}>0</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-1 row-start-4 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "1"); e.target.blur();}}>1</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-2 row-start-4 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "2"); e.target.blur();}}>2</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-3 row-start-4 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "3"); e.target.blur();}}>3</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-1 row-start-3 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "4"); e.target.blur();}}>4</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-2 row-start-3 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "5"); e.target.blur();}}>5</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-3 row-start-3 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "6"); e.target.blur();}}>6</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-1 row-start-2 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "7"); e.target.blur();}}>7</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-2 row-start-2 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "8"); e.target.blur();}}>8</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-3 row-start-2 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "9"); e.target.blur();}}>9</button>
        <button className="focus:ring-blue-500 focus:bg-gray-900 hover:ring-2 hover:ring-blue-500 col-start-2 row-start-5 bg-gray-700 focus:outline-none" onClick={(e) => {setResult(result + "."); e.target.blur();}}>.</button>
      </div>
    </div>
  );
}

export default App;
