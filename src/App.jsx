import React, { useState, useEffect } from "react";
import exercises from "./data";
import "./App.css";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Chest", "Legs", "Core", "Arms", "Full Body"];

  const filteredExercises = exercises.filter(
    (ex) =>
      (filter === "All" || ex.category === filter) &&
      ex.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedExercise = selectedIndex !== null ? filteredExercises[selectedIndex] : null;

  const openExercise = (index) => {
    setSelectedIndex(index);
    setStepIndex(0);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setStepIndex(0);
  };

  const speakStep = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // stop any previous speech
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.9; // slower for kids
      window.speechSynthesis.speak(utter);
    }
  };

  useEffect(() => {
    if (selectedExercise) {
      speakStep(selectedExercise.steps[stepIndex]);
    }
  }, [stepIndex, selectedExercise]);

  return (
    <div className="app">
      <h1>🟢 Kid-Friendly Exercises</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* Category Tabs */}
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

      {/* Exercise Cards */}
      <div className="grid">
        {filteredExercises.map((ex, index) => (
          <div key={ex.id} className="card" onClick={() => openExercise(index)}>
            <img src={ex.image} alt={ex.name} />
            <h2>{ex.name}</h2>
            <span className="tag" style={{ backgroundColor: ex.color }}>
              {ex.category}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedExercise && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <h2>{selectedExercise.name}</h2>

            {selectedExercise.demo && (
              <div className="demo">
                <img
                  src={selectedExercise.demo}
                  autoPlay
                  loop
                  muted
                  controls
                  width="100%"
                  style={{ borderRadius: "12px", marginBottom: "15px" }}
                />
              </div>
            )}

            {/* Step display */}
            <div className="step-section">
              <p className="current-step">{selectedExercise.steps[stepIndex]}</p>

              <div className="step-controls">
                <button
                  onClick={() => setStepIndex(Math.max(stepIndex - 1, 0))}
                  disabled={stepIndex === 0}
                >
                  ← Prev Step
                </button>
                <button
                  onClick={() =>
                    setStepIndex(
                      Math.min(stepIndex + 1, selectedExercise.steps.length - 1)
                    )
                  }
                  disabled={stepIndex === selectedExercise.steps.length - 1}
                >
                  Next Step →
                </button>
                <button onClick={() => speakStep(selectedExercise.steps[stepIndex])}>
                  🔊 Read Step
                </button>
              </div>
              <p className="step-counter">
                Step {stepIndex + 1} of {selectedExercise.steps.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
