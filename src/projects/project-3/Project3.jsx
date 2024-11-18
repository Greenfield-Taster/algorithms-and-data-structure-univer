import React, { useState } from "react";

const Project3 = () => {
  const [bucketVolumes, setBucketVolumes] = useState([]);
  const [tankVolume, setTankVolume] = useState(0); 
  const [result, setResult] = useState([]); 

  const handleBucketChange = (index, newVolume) => {
    const updatedBuckets = [...bucketVolumes];
    updatedBuckets[index] = Number(newVolume);
    setBucketVolumes(updatedBuckets);
  };

  const handleTankChange = (event) => {
    setTankVolume(Number(event.target.value));
  };

  const addBucket = (volume) => {
    if (volume > 0) {
      setBucketVolumes([...bucketVolumes, Number(volume)]);
    }
  };

  const deleteBucket = (index) => {
    setBucketVolumes(bucketVolumes.filter((_, i) => i !== index));
  };

  const calculate = () => {
    if (
      tankVolume <= 0 ||
      bucketVolumes.length === 0 ||
      bucketVolumes.some((vol) => vol <= 0)
    ) {
      setResult([{ error: "Будь ласка, введіть коректні дані." }]);
      return;
    }

    const sortedBuckets = [...bucketVolumes].sort((a, b) => b - a);
    let remainingVolume = tankVolume;
    const result = [];

    for (let i = 0; i < sortedBuckets.length; i++) {
      const bucketVolume = sortedBuckets[i];
      const count = Math.floor(remainingVolume / bucketVolume);
      if (count > 0) {
        result.push({ volume: bucketVolume, count });
      }
      remainingVolume -= count * bucketVolume;

      if (remainingVolume === 0) {
        setResult(result);
        return;
      }
    }

    if (remainingVolume > 0) {
      setResult([{ error: "Неможливо наповнити діжку з цими відрами." }]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Заповнення діжки</h1>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Об'єм діжки (л): </label>
        <input
          type="number"
          value={tankVolume}
          onChange={handleTankChange}
          min="1"
          placeholder="Введіть об'єм діжки"
          style={{ padding: "5px", width: "200px" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h2>Відра</h2>
        <input
          type="number"
          min="1"
          placeholder="Додати відро (л)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addBucket(Number(e.target.value));
              e.target.value = "";
            }
          }}
          style={{ padding: "5px", width: "200px", marginBottom: "10px" }}
        />
        <ul>
          {bucketVolumes.map((volume, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <span>{volume} л</span>{" "}
              <button
                onClick={() => deleteBucket(index)}
                style={{ marginLeft: "10px" }}
              >
                Видалити
              </button>
              <input
                type="number"
                value={volume}
                onChange={(e) => handleBucketChange(index, e.target.value)}
                style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={calculate}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Розв'язати
      </button>
      <h2 style={{ marginTop: "20px" }}>Результат:</h2>
      <ul>
        {result.map((res, index) =>
          res.error ? (
            <li key={index} style={{ color: "red", fontWeight: "bold" }}>
              {res.error}
            </li>
          ) : (
            <li key={index}>
              {res.count} відер(а) об'ємом {res.volume} л
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Project3;
