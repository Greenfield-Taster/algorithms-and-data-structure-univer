import React, { useState } from "react"; 

const Task1 = () => {
  const [graph, setGraph] = useState({
    1: [2, 3],
    2: [1, 4],
    3: [1, 4],
    4: [2, 3, 5],
    5: [4],
  });

  const [startVertex, setStartVertex] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState([]);

  // Функція для визначення вершин на заданій відстані
  const findVerticesAtDistance = () => {
    const visited = new Set();
    const queue = [[startVertex, 0]]; // Містить пару [вершина, поточна відстань]
    visited.add(startVertex);
    const verticesAtDistance = [];

    while (queue.length > 0) {
      const [vertex, currentDistance] = queue.shift();

      if (currentDistance === Number(distance)) {
        verticesAtDistance.push(vertex);
      }

      if (currentDistance < Number(distance)) {
        const neighbors = graph[vertex] || [];
        neighbors.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push([neighbor, currentDistance + 1]);
          }
        });
      }
    }

    setResult(verticesAtDistance);
  };

  return (
    <div className="container">
      <h2>Задайте граф та відстань</h2>

      {/* Введення для графа (текстова область) */}
      <div className="input-container">
        <label className="label">
          Граф (введіть зв'язки у вигляді об'єкта):
        </label>
        <textarea
          className="textarea"
          value={JSON.stringify(graph, null, 2)}
          onChange={(e) => setGraph(JSON.parse(e.target.value))}
          rows={8}
          placeholder="Введіть граф у форматі JSON..."
        />
      </div>

      {/* Вибір початкової вершини */}
      <div className="input-container">
        <label className="label">Виберіть початкову вершину:</label>
        <input
          className="input"
          type="text"
          value={startVertex}
          onChange={(e) => setStartVertex(e.target.value)}
        />
      </div>

      {/* Вибір відстані */}
      <div className="input-container">
        <label className="label">Виберіть відстань:</label>
        <input
          className="input"
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>

      {/* Кнопка для пошуку вершин на заданій відстані */}
      <button className="button" onClick={findVerticesAtDistance}>
        Знайти вершини
      </button>

      {/* Результат */}
      <div>
        <h3>
          Вершини на відстані {distance} від {startVertex}:
        </h3>
        <ul>
          {result.length > 0 ? (
            result.map((vertex, index) => <li key={index}>{vertex}</li>)
          ) : (
            <li>Немає вершин на цій відстані.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Task1;
