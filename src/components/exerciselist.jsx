import React from "react";

const ExerciseList = ({ exercises, onSelect }) => {
  return (
    <div className="exercise-list">
      <h2>Exercises</h2>
      <ul>
        {exercises.map(ex => (
          <li key={ex.id} onClick={() => onSelect(ex)}>
            {ex.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
