import React from "react";

const ExerciseDetail = ({ exercise }) => {
  if (!exercise) {
    return (
      <div className="exercise-detail">
        <h2>Select an exercise to see steps</h2>
      </div>
    );
  }

  return (
    <div className="exercise-detail">
      <h2>{exercise.name} Steps</h2>
      <ol>
        {exercise.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default ExerciseDetail;
