import React, { useState, useEffect } from "react";

const Task2 = () => {
  const [projects, setProjects] = useState([]);
  const [budget, setBudget] = useState(0);
  const [maxProfit, setMaxProfit] = useState(null);
  const [strategy, setStrategy] = useState([]);

  // Додавання дефолтних проектів
  useEffect(() => {
    const defaultProjects = [
      { id: 1, name: "Проєкт 1", levels: ["12", "18", "22"], profit: 0 },
      { id: 2, name: "Проєкт 2", levels: ["15", "25", "30"], profit: 0 },
      { id: 3, name: "Проєкт 3", levels: ["10", "20", "35"], profit: 0 },
    ];
    setProjects(defaultProjects);
  }, []);

  const addProject = () => {
    setProjects([
      ...projects,
      { id: Date.now(), name: "", levels: [], profit: 0 },
    ]);
  };

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]: field === "levels" ? value.split(",") : value,
            }
          : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const solveInvestmentProblem = () => {
    const dp = Array(budget + 1).fill(0);
    const strategyTracker = Array(budget + 1).fill([]);

    projects.forEach((project) => {
      const profits = project.levels.map(Number);
      for (let currentBudget = budget; currentBudget >= 0; currentBudget--) {
        profits.forEach((profit, level) => {
          const cost = (level + 1) * 10;  
          if (currentBudget >= cost) {
            const newProfit = dp[currentBudget - cost] + profit;
            if (newProfit > dp[currentBudget]) {
              dp[currentBudget] = newProfit;
              strategyTracker[currentBudget] = [
                ...strategyTracker[currentBudget - cost],
                { project: project.name, investment: cost, profit },
              ];
            }
          }
        });
      }
    });

    setMaxProfit(dp[budget]);
    setStrategy(strategyTracker[budget]);
  };

  return (
    <div>
      <h3>Інвестиційна задача</h3>
      <div>
        <label>
          Загальний бюджет(в тисячах грн):
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={addProject}>Додати проєкт</button>
      {projects.map((project) => (
        <div key={project.id}>
          <input
            type="text"
            placeholder="Назва проєкту"
            value={project.name}
            onChange={(e) => updateProject(project.id, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Прибуток за рівнями (через кому)"
            value={project.levels}
            onChange={(e) =>
              updateProject(project.id, "levels", e.target.value)
            }
          />
          <button onClick={() => deleteProject(project.id)}>Видалити</button>
        </div>
      ))}
      <button onClick={solveInvestmentProblem}>Визначити стратегію</button>
      {maxProfit !== null && (
        <div>
          <h4>Максимальний прибуток: {maxProfit}</h4>
          <h4>Рекомендована стратегія:</h4>
          <ul>
            {strategy.map((s, index) => (
              <li key={index}>
                {s.project}: Інвестиція {s.investment} тис. грн., Прибуток{" "}
                {s.profit} тис. грн.
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Task2;
