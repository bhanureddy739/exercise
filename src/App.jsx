import React, { useState } from "react";
import "./App.css";
import ExerciseList from "./components/exerciselist";
import ExerciseDetail from "./components/exercisedetail";
import exercises from "./data";

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="app">
      <h1>Exercise Platform</h1>
      <div className="container">
        <ExerciseList
          exercises={exercises}
          onSelect={setSelectedExercise}
        />
        <ExerciseDetail exercise={selectedExercise} />
      </div>
    </div>
  );
}

export default App;
