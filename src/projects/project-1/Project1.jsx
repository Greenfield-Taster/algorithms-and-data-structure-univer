import "./Project1.css"
import React from 'react'
import {Task1} from "./components/Task1.js"
import {Task2} from "./components/Task2.js"
import {Task3} from "./components/Task3.js"

function Project1() {
  const list = new Task1();

  const handleActions = () => {
    list.addToStart(1);
    list.addToStart(2);
    list.addAfter(1, 3);
    list.search(3);
    list.delete(2);
    list.displayFromStart();
    list.displayFromEnd();
  };

  return (
    <div className="Project1">
      <div className="wrapperProj1">
        <div className="blockProj1">
          <button onClick={handleActions}>Двозв'язний список</button>
        </div>
        <div className="blockProj1">
          <button onClick={Task2}>Купа</button>
        </div>
        <div className="blockProj1">
          <button onClick={Task3}>Пірамідальне сортування (варіант 3)</button>
        </div>
      </div>
    </div>
  );
}

export default Project1
