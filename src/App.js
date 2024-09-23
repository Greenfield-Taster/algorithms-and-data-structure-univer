import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>Univer projects developed by Anastasiia Horbachova</header>
      <div className="wrapper">
        <div className="blocks">
          <Link to="/project-1" className="link">
            <div className="block">Move to project 1</div>
          </Link>
          <Link to="/project-1" className="link">
            <div className="block">Move to project 2</div>
          </Link>
          <Link to="/project-1" className="link">
            <div className="block">Move to project 3</div>
          </Link>
          <Link to="/project-1" className="link">
            <div className="block">Move to project 4</div>
          </Link>
          <Link to="/project-1" className="link">
            <div className="block">Move to project 5</div>
          </Link>
          <Link to="/project-1" className="link">
            <div className="block">Move to project 6</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
