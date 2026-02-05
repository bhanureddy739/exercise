import React from "react";

export default function ActivitySummary({ activities }) {
  return (
    <div>
      <h3>📊 Activity Summary</h3>
      {activities.map((act, index) => (
        <p key={index}>
          {act.exercise} – {act.reps}
        </p>
      ))}
    </div>
  );
}
