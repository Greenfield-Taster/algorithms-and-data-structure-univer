import React, { useState } from "react";
 
const tarjanSCC = (graph) => {
  const low = {};
  const disc = {};
  const stack = [];
  const inStack = {};
  const result = [];
  let time = 0;

  const dfs = (v) => {
    disc[v] = low[v] = time++;
    stack.push(v);
    inStack[v] = true;
 
    if (graph[v]) {
      for (let neighbor of graph[v]) {
        if (disc[neighbor] === undefined) {
          // Якщо сусіда ще не відвідали
          dfs(neighbor);
          low[v] = Math.min(low[v], low[neighbor]);
        } else if (inStack[neighbor]) {
          // Якщо сусід в стосі, то є цикл
          low[v] = Math.min(low[v], disc[neighbor]);
        }
      }
    }
 
    if (low[v] === disc[v]) {
      const component = [];
      let w;
      do {
        w = stack.pop();
        inStack[w] = false;
        component.push(w);
      } while (w !== v);
      result.push(component);
    }
  };
 
  for (let vertex in graph) {
    if (disc[vertex] === undefined) {
      dfs(vertex);
    }
  }

  return result;
};

const Task3 = () => {
  const [graph, setGraph] = useState({
    1: [2, 3],
    2: [1, 4],
    3: [1, 4],
    4: [2, 3, 5],
    5: [4],
  });
  const [sccResult, setSccResult] = useState([]);

  const handleSubmit = () => {
    try { 
      const parsedGraph = graph;
 
      const stronglyConnectedComponents = tarjanSCC(parsedGraph);
      setSccResult(stronglyConnectedComponents);
    } catch (error) {
      setSccResult("Помилка при розборі графа. Перевірте формат.");
    }
  };

  return (
    <div className="container">
      <h2>Задача 3: Розкладання графа на сильно зв'язні компоненти</h2>

      <div className="input-container">
        <label className="label" htmlFor="graph">
          Граф (введіть у форматі JSON):
        </label>
        <textarea
          className="textarea"
          value={JSON.stringify(graph, null, 2)}
          onChange={(e) => setGraph(JSON.parse(e.target.value))}
          rows={8}
          placeholder="Введіть граф у форматі JSON..."
        />
      </div>

      <button className="button" onClick={handleSubmit}>
        Знайти SCC
      </button>

      <div className="result">
        <h3>Результат:</h3>
        {Array.isArray(sccResult) ? (
          <pre>{JSON.stringify(sccResult, null, 2)}</pre>
        ) : (
          <p>{sccResult}</p>
        )}
      </div>
    </div>
  );
};

export default Task3;
