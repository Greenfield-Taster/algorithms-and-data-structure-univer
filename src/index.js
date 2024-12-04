import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Project1 from "./projects/project-1/Project1";
import Project2 from "./projects/project-2/Project2";
import Project3 from "./projects/project-3/Project3";
import Project4 from "./projects/project-4/Project4";
import Project5 from "./projects/project-5/Project5";
import Project6 from "./projects/project-6/Project6";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project-1" element={<Project1 />} />
        <Route path="/project-2" element={<Project2 />} />
        <Route path="/project-3" element={<Project3 />} />
        <Route path="/project-4" element={<Project4 />} />
        <Route path="/project-5" element={<Project5 />} />
        <Route path="/project-6" element={<Project6 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
