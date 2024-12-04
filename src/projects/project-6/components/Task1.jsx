import React, { useState } from "react"; 

const Task1 = () => {
  const [exchangeRates, setExchangeRates] = useState([]); 
  const [baseCurrency, setBaseCurrency] = useState("");  
  const [result, setResult] = useState("");  
 
  const findArbitrage = () => {
    if (!baseCurrency || exchangeRates.length === 0) {
      setResult("Будь ласка, введіть базову валюту та курси обміну.");
      return;
    }

    const currencies = Array.from(
      new Set(exchangeRates.flatMap((rate) => [rate.from, rate.to]))
    );
    const currencyIndex = Object.fromEntries(
      currencies.map((cur, idx) => [cur, idx])
    );
    const n = currencies.length;
 
    const graph = Array.from({ length: n }, () => Array(n).fill(Infinity));
    exchangeRates.forEach(({ from, to, rate }) => {
      graph[currencyIndex[from]][currencyIndex[to]] = -Math.log(rate);
    });
 
    const dist = Array(n).fill(Infinity);
    const predecessor = Array(n).fill(-1);
    dist[currencyIndex[baseCurrency]] = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let u = 0; u < n; u++) {
        for (let v = 0; v < n; v++) {
          if (dist[u] + graph[u][v] < dist[v]) {
            dist[v] = dist[u] + graph[u][v];
            predecessor[v] = u;
          }
        }
      }
    }
 
    for (let u = 0; u < n; u++) {
      for (let v = 0; v < n; v++) {
        if (dist[u] + graph[u][v] < dist[v]) {
          // Знайдено цикл
          const cycle = [];
          let current = v;
 
          for (let i = 0; i < n; i++) {
            current = predecessor[current];
          }

          let start = current;
          do {
            cycle.push(currencies[current]);
            current = predecessor[current];
          } while (current !== start);
          cycle.push(currencies[start]);
          cycle.reverse();
 
          let profit = 1;
          for (let i = 0; i < cycle.length - 1; i++) {
            const from = cycle[i];
            const to = cycle[i + 1];
            const rate = exchangeRates.find(
              (rate) => rate.from === from && rate.to === to
            ).rate;
            profit *= rate;
          }

          setResult(
            `Арбітраж знайдено: ${cycle.join(" → ")}. Вигода: ${profit.toFixed(
              2
            )} одиниць.`
          );
          return;
        }
      }
    }

    setResult("Арбітражні можливості відсутні.");
  };
 
  const addExchangeRate = (newRate) => {
    setExchangeRates([...exchangeRates, newRate]);
  };
 
  const removeExchangeRate = (index) => {
    setExchangeRates(exchangeRates.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Арбітражні операції</h1>
      <div className="baseCurrency">
        <label>
          Виберіть базову валюту:
          <input
            type="text"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          />
        </label>
      </div>
      <div>
        <h2>Додати курс обміну:</h2>
        <CurrencyInput onAddRate={addExchangeRate} />
      </div>
      <button className="button" onClick={findArbitrage}>
        Знайти арбітраж
      </button>
      <div>
        <h2>Додані курси обміну:</h2>
        <ul>
          {exchangeRates.map((rate, index) => (
            <li key={index}>
              {rate.from} → {rate.to}: {rate.rate}
              <button
                className="delete-button"
                onClick={() => removeExchangeRate(index)}
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Результат:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
};

const CurrencyInput = ({ onAddRate }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && rate) {
      onAddRate({ from, to, rate: parseFloat(rate) });
      setFrom("");
      setTo("");
      setRate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        placeholder="Валюта з"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Валюта до"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Курс обміну"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Task1;
