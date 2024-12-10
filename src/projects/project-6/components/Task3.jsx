//Алгоритм Флойда-Воршелла - призначений для пошуку найкоротшого шляху між всіма парами вершин.
import React, {useState, useEffect} from 'react'
import {buildGraph, dijkstra} from "./class/Class-Task2"
import data from "../data/data.json";

function ShortestPaths() {
  const [graph, setGraph] = useState({});
  const [shortestPaths, setShortestPaths] = useState([]);

  useEffect(() => {
    const builtGraph = buildGraph(data.connections);
    setGraph(builtGraph);
    findAllShortestPaths(builtGraph);
  }, []);

  const findAllShortestPaths = (graph) => {
    const paths = [];
    const streets = data.streets;

    // Обчислюємо найкоротші шляхи між всіма парами вулиць
    for (let i = 0; i < streets.length; i++) {
      for (let j = 0; j < streets.length; j++) {
        if (i !== j) {
          const { path, distance } = dijkstra(
            graph,
            streets[i].id,
            streets[j].id
          );
          paths.push({
            from: streets[i].name,
            to: streets[j].name,
            path,
            distance,
          });
        }
      }
    }
    setShortestPaths(paths);
  };

  return (
    <div>
      <h1>All Shortest Paths</h1>
      <table>
        <thead>
          <tr>
            <th>Start Street</th>
            <th>End Street</th>
            <th>Path</th>
            <th>Travel Time (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {shortestPaths.map((result, index) => (
            <tr key={index}>
              <td>{result.from}</td>
              <td>{result.to}</td>
              <td>
                  Path:{" "}
                  {result.path
                    .map(
                      (id) =>
                        data.streets.find(
                          (street) => street.id === parseInt(id)
                        ).name
                    )
                    .join(" → ")}
              </td>
              <td>{result.distance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShortestPaths;