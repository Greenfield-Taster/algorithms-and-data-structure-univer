import React, { useState } from "react";

const Task1 = () => {
  const [sequence, setSequence] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
 
  const addElement = () => {
    if (!isNaN(Number(inputValue))) {
      setSequence([...sequence, Number(inputValue)]);
      setInputValue("");
    } else {
      alert("Please enter a valid number.");
    }
  };
 
  const removeElement = (index) => {
    const newSequence = sequence.filter((_, i) => i !== index);
    setSequence(newSequence);
  };
 
  const findLongestContinuousDecreasingSubsequence = () => {
    const n = sequence.length;
    if (n === 0) {
      setResult({ length: 0, subsequence: [] });
      return;
    }

    let maxLength = 1;
    let currentLength = 1;
    let startIndex = 0;
    let bestStartIndex = 0;

    for (let i = 1; i < n; i++) {
      if (sequence[i] < sequence[i - 1]) {
        currentLength++;
        if (currentLength > maxLength) {
          maxLength = currentLength;
          bestStartIndex = startIndex;
        }
      } else {
        currentLength = 1;
        startIndex = i;
      }
    }

    const subsequence = sequence.slice(
      bestStartIndex,
      bestStartIndex + maxLength
    );
    setResult({ length: maxLength, subsequence });
  };

  return (
    <div className="wrapperTask1">
      <h2>Task 1: Longest Continuous Decreasing Subsequence</h2>
      <div>
        <label>
          Enter a number:
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button onClick={addElement}>Add</button>
      </div>
      <div>
        <h3>Current Sequence:</h3>
        <ul>
          {sequence.map((num, index) => (
            <li key={index}>
              {num} <button onClick={() => removeElement(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={findLongestContinuousDecreasingSubsequence}>
        Find Longest Decreasing Subsequence
      </button>
      {result && (
        <div>
          <h3>Result:</h3>
          <p>Length: {result.length}</p>
          <p>Subsequence: {result.subsequence.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Task1;
