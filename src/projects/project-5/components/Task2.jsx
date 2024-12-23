import React, { useState } from "react";

const Task2 = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operations, setOperations] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    const ops = operations.split(",").map((op) => op.trim());

    if (isNaN(numA) || isNaN(numB) || ops.length === 0) {
      setResult("Будь ласка, введіть коректні значення");
      return;
    }
 
    const bfs = (start, target, operations) => {
      const queue = [[start, []]];  
      const visited = new Set();  

      while (queue.length > 0) {
        const [current, path] = queue.shift();  

        if (current === target) {
          return path;  
        }

        if (visited.has(current)) continue; 
        visited.add(current);  

        for (let op of operations) {
          let newNumber;
          let operationName = "";
 
          if (op.startsWith("додати")) {
            const num = parseInt(op.split(" ")[1]);
            newNumber = current + num;
            operationName = `додати ${num}`;
          } else if (op.startsWith("помножити")) {
            const num = parseInt(op.split(" ")[2]);
            newNumber = current * num;
            operationName = `помножити на ${num}`;
          }

          if (!visited.has(newNumber)) {
            queue.push([newNumber, [...path, operationName]]);  
          }
        }
      }

      return null;  
    };
 
    const operationsPath = bfs(numA, numB, ops);

    if (operationsPath) {
      setResult(`Мінімальний набір операцій: ${operationsPath.join(" -> ")}`);
    } else {
      setResult("Перетворення неможливе");
    }
  };

  return (
    <div className="container">
      <h2>Задача 2: Перетворення числа за допомогою операцій</h2>

      <div className="input-container">
        <label className="label" htmlFor="a">
          Число a:
        </label>
        <input
          id="a"
          className="input"
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Введіть число a"
        />
      </div>

      <div className="input-container">
        <label className="label" htmlFor="b">
          Число b:
        </label>
        <input
          id="b"
          className="input"
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Введіть число b"
        />
      </div>

      <div className="input-container">
        <label className="label" htmlFor="operations">
          Операції (через кому):
        </label>
        <input
          id="operations"
          className="input"
          type="text"
          value={operations}
          onChange={(e) => setOperations(e.target.value)}
          placeholder="Введіть операції, напр. 'додати 3, помножити на 2'"
        />
      </div>

      <button className="button" onClick={handleSubmit}>
        Знайти шлях
      </button>

      <div className="result">
        <h3>Результат:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default Task2;
