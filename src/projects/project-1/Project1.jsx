import "./Project1.css";
import React, {useState} from "react";
import { Task1 } from "./components/Task1.js";
import { Task2 } from "./components/Task2.js";
import { Student, StudentHeap } from "./components/Task3.js";

function Project1() {
  const list = new Task1();

  const handleActionsList = () => {
    list.addToStart(1);
    list.addToStart(2);
    list.addAfter(1, 3);
    list.search(3);
    list.delete(2);
    list.displayFromStart();
    list.displayFromEnd();
  };

  const heap = new Task2();

  const handleActionsHeap = () => {
    heap.insert(10);
    heap.insert(5);
    heap.insert(20);
    heap.insert(1);
    heap.display();

    heap.remove();
    heap.display();

    const arr = [3, 9, 2, 1, 7, 8];
    heap.buildHeap(arr);
    heap.display();

    heap.heapSort();
  };
  
  const students = [
    new Student("Ivanov", "Ivan", "Ivanovich", "Kyiv", 85, "male", "2000-05-12"),
    new Student("Petrova", "Maria", "Petrovna", "Lviv", 90, "female", "1999-12-30"),
    new Student("Sidorov", "Sergey", "Sergeevich", "Kharkiv", 78, "male", "2001-05-05"),
    new Student("Kovalenko", "Olga", "Vladimirovna", "Odessa", 82, "female", "2000-08-20"),
  ];
 
  const handleActionsStudents = () => {
   const studentHeap = new StudentHeap(students);
   const sortedMonths = studentHeap.heapSortByMonth();  
 
   console.log("Sorted months by student count:", sortedMonths);
  };


  return (
    <div className="Project1">
      <div className="wrapperProj1">
        <div className="blockProj1">
          <button onClick={handleActionsList}>Двозв'язний список</button>
        </div>
        <div className="blockProj1">
          <button onClick={handleActionsHeap}>Купа</button>
        </div>
        <div className="blockProj1">
          <button onClick={handleActionsStudents}>Пірамідальне сортування (варіант 3)</button>
        </div>
      </div>
    </div>
  );
}

export default Project1;
