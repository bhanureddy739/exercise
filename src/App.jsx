import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import exercises from "./data";
import FormPage from "./formpage";

function ExercisePage() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Chest", "Legs", "Core", "Arms", "Full Body"];

  const filteredExercises = exercises.filter(
    (ex) =>
      (filter === "All" || ex.category === filter) &&
      ex.name.toLowerCase().includes(search.toLowerCase())
  );

  const speakStep = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
    }
  };

  useEffect(() => {
    if (selectedExercise) {
      speakStep(selectedExercise.steps[stepIndex]);
    }
  }, [stepIndex]);

  return (
    <div className="app">
      <h1>🟢 Kid-Friendly Exercises</h1>

      <input
        className="search"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="card"
            onClick={() => {
              setSelectedExercise(ex);
              setStepIndex(0);
            }}
          >
            <img src={ex.image} alt={ex.name} />
            <h3>{ex.name}</h3>
            <span className="tag" style={{ background: ex.color }}>
              {ex.category}
            </span>
          </div>
        ))}
      </div>

      {selectedExercise && (
        <div className="modal" onClick={() => setSelectedExercise(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedExercise(null)}>
              &times;
            </span>

            <h2>{selectedExercise.name}</h2>

            <img
              src={selectedExercise.demo}
              alt="demo"
              className="demo"
            />

            <p className="current-step">
              {selectedExercise.steps[stepIndex]}
            </p>

            <div className="step-controls">
              <button
                disabled={stepIndex === 0}
                onClick={() => setStepIndex(stepIndex - 1)}
              >
                ← Prev
              </button>

              <button
                disabled={stepIndex === selectedExercise.steps.length - 1}
                onClick={() => setStepIndex(stepIndex + 1)}
              >
                Next →
              </button>

              <button onClick={() => speakStep(selectedExercise.steps[stepIndex])}>
                🔊 Read
              </button>
            </div>

            <p>
              Step {stepIndex + 1} / {selectedExercise.steps.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Exercises</Link>
        <Link to="/form">My Activity</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ExercisePage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}
