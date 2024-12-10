//алгоритм Дейкстри
export function buildGraph(connections) {
  const graph = {};

  connections.forEach(({ from, to, distance, trafficDelay, oneWay }) => {
    const totalDistance = distance + trafficDelay;

    if (!graph[from]) graph[from] = [];
    graph[from].push({ to, distance: totalDistance });

    if (!oneWay) {
      if (!graph[to]) graph[to] = [];
      graph[to].push({ to: from, distance: totalDistance });
    }
  });

  return graph;
}

export function dijkstra(graph, start, end) {
  const distances = {};
  const visited = new Set();
  const previous = {};
  const priorityQueue = [];

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[start] = 0;
  priorityQueue.push({ node: start, distance: 0 });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.distance - b.distance);
    const { node: currentNode } = priorityQueue.shift();

    if (visited.has(currentNode)) continue;
    visited.add(currentNode);

    if (currentNode === end) break;

    graph[currentNode].forEach(({ to, distance }) => {
      const newDistance = distances[currentNode] + distance;

      if (newDistance < distances[to]) {
        distances[to] = newDistance;
        previous[to] = currentNode;
        priorityQueue.push({ node: to, distance: newDistance });
      }
    });
  }

  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return { path, distance: distances[end] };
}
