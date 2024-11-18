import React, { useState } from "react";

class HashTable {
  constructor(size) {
    this.size = size;
    this.table = Array(size)
      .fill(null)
      .map(() => []);
  }
 
  hash(key) {
    const A = 0.6180339887;  
    const hashValue = key
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Math.floor(this.size * ((hashValue * A) % 1));
  }
 
  insert(key, value) {
    const index = this.hash(key);
    const chain = this.table[index];
 
    for (let item of chain) {
      if (item.key === key) {
        item.value = value; 
        return;
      }
    }
 
    chain.push({ key, value });
  }
 
  find(key) {
    const index = this.hash(key);
    const chain = this.table[index];

    for (let item of chain) {
      if (item.key === key) {
        return item.value;
      }
    }

    return null;  
  }
 
  getTable() {
    return this.table;
  }
}

const Task1 = () => {
  const [hashTable] = useState(new HashTable(10));
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
 
  const handleInsert = () => {
    if (name && position) {
      hashTable.insert(name, position);
      setName("");
      setPosition("");
    }
  };
 
  const handleSearch = () => {
    const result = hashTable.find(searchName);
    setSearchResult(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Хеш-таблица с методом цепочек</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Добавление данных</h2>
        <input
          type="text"
          placeholder="ФИО сотрудника"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Должность"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleInsert}>Добавить</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Поиск должности по ФИО</h2>
        <input
          type="text"
          placeholder="ФИО для поиска"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Поиск</button>
        {searchResult !== null && (
          <div>
            <h3>Результат:</h3>
            {searchResult ? (
              <p>Должность: {searchResult}</p>
            ) : (
              <p>Сотрудник не найден.</p>
            )}
          </div>
        )}
      </div>

      <h2>Визуализация хеш-таблицы</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
        }}
      >
        {hashTable.getTable().map((chain, index) => (
          <div
            key={index}
            style={{ border: "1px solid black", padding: "10px" }}
          >
            <h4>Индекс {index}</h4>
            {chain.length === 0 ? (
              <p>Пусто</p>
            ) : (
              <ul>
                {chain.map((item, idx) => (
                  <li key={idx}>
                    {item.key}: {item.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task1;
