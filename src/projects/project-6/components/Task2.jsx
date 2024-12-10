import React, {useState, useEffect} from 'react'
import data from '../data/data.json'
import { buildGraph, dijkstra } from "./class/Class-Task2";

const Task2 = () => {
  const [graph, setGraph] = useState({});
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const builtGraph = buildGraph(data.connections);
    setGraph(builtGraph);
  }, []);

  const handleCalculate = () => {
    if (start && end) {
      const { path, distance,  } = dijkstra(graph, start, end);
      setResult({ path, distance });
    }
  };

  return (
    <div>
      <h1>Find Shortest Path</h1>
      <div>
        <label>Start Street: </label>
        <select value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="">Select Start</option>
          {data.streets.map((street) => (
            <option key={street.id} value={street.id}>
              {street.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>End Street: </label>
        <select value={end} onChange={(e) => setEnd(e.target.value)}>
          <option value="">Select End</option>
          {data.streets.map((street) => (
            <option key={street.id} value={street.id}>
              {street.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <h2>Shortest Path</h2>
          <p>
            Path:{" "}
            {result.path
              .map(
                (id) =>
                  data.streets.find((street) => street.id === parseInt(id)).name
              )
              .join(" → ")}
          </p>
          <p>Total Travel Time: {result.distance.toFixed(2)} minutes</p>
        </div>
      )}
    </div>
  );
}

export default Task2
