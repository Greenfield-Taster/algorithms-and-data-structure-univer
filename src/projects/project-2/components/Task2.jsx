import React, { useState } from "react";
 
class StudentNode {
  constructor(gradebookNumber, surname, initials, group, averageGrade) {
    this.gradebookNumber = gradebookNumber;
    this.surname = surname;
    this.initials = initials;
    this.group = group;
    this.averageGrade = averageGrade;
    this.left = null;
    this.right = null;
  }
}
 
class StudentTree {
  constructor() {
    this.root = null;
  }
 
  insert(gradebookNumber, surname, initials, group, averageGrade) {
    const newNode = new StudentNode(
      gradebookNumber,
      surname,
      initials,
      group,
      averageGrade
    );
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.gradebookNumber < node.gradebookNumber) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
 
  find(gradebookNumber) {
    return this.search(this.root, gradebookNumber);
  }

  search(node, gradebookNumber) {
    if (node === null) return null;
    if (gradebookNumber < node.gradebookNumber) {
      return this.search(node.left, gradebookNumber);
    } else if (gradebookNumber > node.gradebookNumber) {
      return this.search(node.right, gradebookNumber);
    } else {
      return node;
    }
  }
 
  findBestStudent() {
    return this.findExtremum(this.root, "max");
  }
 
  findWorstStudent() {
    return this.findExtremum(this.root, "min");
  }

  findExtremum(node, type) {
    if (node === null) return null;

    let extremumNode = node;
    const traverse = (currentNode) => {
      if (!currentNode) return;
      if (
        type === "max" &&
        currentNode.averageGrade > extremumNode.averageGrade
      ) {
        extremumNode = currentNode;
      }
      if (
        type === "min" &&
        currentNode.averageGrade < extremumNode.averageGrade
      ) {
        extremumNode = currentNode;
      }
      traverse(currentNode.left);
      traverse(currentNode.right);
    };

    traverse(node);
    return extremumNode;
  }
 
  getStudentsInOrder(node = this.root, students = []) {
    if (node !== null) {
      this.getStudentsInOrder(node.left, students);
      students.push(node);
      this.getStudentsInOrder(node.right, students);
    }
    return students;
  }
}

const Task2 = () => {
  const [studentTree] = useState(new StudentTree());
  const [gradebookNumber, setGradebookNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [initials, setInitials] = useState("");
  const [group, setGroup] = useState("");
  const [averageGrade, setAverageGrade] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [bestStudent, setBestStudent] = useState(null);
  const [worstStudent, setWorstStudent] = useState(null);
 
  const handleInsert = () => {
    studentTree.insert(
      gradebookNumber,
      surname,
      initials,
      group,
      parseFloat(averageGrade)
    );
    setGradebookNumber("");
    setSurname("");
    setInitials("");
    setGroup("");
    setAverageGrade("");
  };
 
  const handleSearch = () => {
    const student = studentTree.find(parseInt(searchNumber));
    setSearchResult(student);
  };
 
  const handleFindBest = () => {
    const best = studentTree.findBestStudent();
    setBestStudent(best);
  };
 
  const handleFindWorst = () => {
    const worst = studentTree.findWorstStudent();
    setWorstStudent(worst);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Дерево студентов</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Добавление студента</h2>
        <input
          type="text"
          placeholder="Номер зачетной книжки"
          value={gradebookNumber}
          onChange={(e) => setGradebookNumber(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Инициалы"
          value={initials}
          onChange={(e) => setInitials(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Группа"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Средний балл"
          value={averageGrade}
          onChange={(e) => setAverageGrade(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleInsert}>Добавить студента</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Поиск студента по номеру зачетной книжки</h2>
        <input
          type="text"
          placeholder="Номер зачетной книжки"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSearch}>Поиск</button>
        {searchResult && (
          <div>
            <h3>Результат поиска:</h3>
            <p>
              {searchResult.surname} {searchResult.initials}, Группа:{" "}
              {searchResult.group}, Средний балл: {searchResult.averageGrade}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleFindBest}>Найти лучшего студента</button>
        {bestStudent && (
          <div>
            <h3>Лучший студент:</h3>
            <p>
              {bestStudent.surname} {bestStudent.initials}, Средний балл:{" "}
              {bestStudent.averageGrade}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleFindWorst}>Найти худшего студента</button>
        {worstStudent && (
          <div>
            <h3>Худший студент:</h3>
            <p>
              {worstStudent.surname} {worstStudent.initials}, Средний балл:{" "}
              {worstStudent.averageGrade}
            </p>
          </div>
        )}
      </div>

      <h2>Визуализация дерева студентов (симметричный обход)</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
        }}
      >
        {studentTree.getStudentsInOrder().map((student, index) => (
          <div
            key={index}
            style={{ border: "1px solid black", padding: "10px" }}
          >
            <p>
              {student.surname} {student.initials}
            </p>
            <p>Группа: {student.group}</p>
            <p>Средний балл: {student.averageGrade}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task2;
